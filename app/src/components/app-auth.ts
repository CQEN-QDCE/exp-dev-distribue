import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SESSION_STORAGE_ACCESS_TOKEN, SESSION_STORAGE_ID_TOKEN, WINDOW_EVENT_AUTH } from '../constants';
import { environment } from '../environment';
import { APP_NOTIFICATIONS_TAG } from './app-notifications';

/**
 * Composant d'authentification de l'utilisateur.
 *
 * @element app-auth
 */
@customElement('app-auth')
export class AppAuth extends LitElement {
  @property({ type: Boolean }) loggedIn = false;
  @property({ type: String }) userName = '';

  firstUpdated() {
    super.connectedCallback();
    this.fetchTokens();
  }

  createRenderRoot() {
    return this;
  }

  /**
   * Obtient les jetons d'accès et d'identité de l'utilisateur.
   *
   * Étapes :
   * 1. Vérifier si les jetons sont déjà stockés dans le local storage.
   * 2. Si les jetons sont stockés, vérifier si le jeton d'accès est expiré.
   * 3. Si le jeton d'accès est expiré, supprimer les jetons du local storage et rediriger vers la page de login.
   * 4. Si les jetons (access_token et id_token) sont stockés et que le jeton d'accès n'est pas expiré, déclencher l'événement post authentification.
   * 5. Si les jetons ne sont pas stockés, faire une requête à l'API d'authentification pour obtenir les jetons.
   * 6. Si les jetons sont obtenus, les stocker dans le local storage et déclencher l'événement post authentification.
   * 7. Si les jetons ne sont pas obtenus, supprimer les jetons du local storage
   */
  fetchTokens() {
    const storedAccessToken = localStorage.getItem(SESSION_STORAGE_ACCESS_TOKEN);
    const storedIdToken = localStorage.getItem(SESSION_STORAGE_ACCESS_TOKEN);
    const storedAccessTokenExpired = !!storedAccessToken && tokenExpired(storedAccessToken);
    if (!!storedAccessToken && storedAccessTokenExpired) {
      console.info('Token expiré, reduirection vers la page de login');
      localStorage.removeItem(SESSION_STORAGE_ACCESS_TOKEN);
      localStorage.removeItem(SESSION_STORAGE_ID_TOKEN);
      this.login();
    }
    else if (!!storedAccessToken && !!storedIdToken) {
      console.info('Token valide, déclenchement de l\'événement d\'authentification');
      this.afterUserAuthenticates({ access_token: storedAccessToken, id_token: storedIdToken, refresh_token: "" });
    }
    else {
      console.info('Token non stocké, requête à l\'API d\'authentification');
      fetch(`${environment.urlServiceAuth}?no_auth=true`, { credentials: 'include' })
        .then((response) => response.json())
        .then((tokens: TokenSet) => {
          console.info("Tokens", tokens);
          if (!!tokens?.access_token) {
            localStorage.setItem(SESSION_STORAGE_ACCESS_TOKEN, tokens?.access_token || "");
            localStorage.setItem(SESSION_STORAGE_ID_TOKEN, tokens?.id_token || "");
            this.afterUserAuthenticates(tokens);
          }
          else {
            localStorage.removeItem(SESSION_STORAGE_ACCESS_TOKEN);
            localStorage.removeItem(SESSION_STORAGE_ID_TOKEN);
            this.loggedIn = false;
            this.userName = '';
          }
        })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  /**
   * Invoquer après l'authentication de l'utilisateur.
   * 1. Publier l'événement d'authentification
   * 2. Ajouter une minuterie pour demander un nouveau jeton d'accès avant l'expiration du jeton d'accès actuel.
   * 3. Chercher les composants coquille-notifications et ajouter l'attribut userId
   * 4. Rafraîchir le composant app-auth (celui-ci même)
   * @param tokens
   */
  afterUserAuthenticates(tokens: TokenSet) {
    const userInfo = parseToken(tokens?.id_token || '');
    this.loggedIn = true;
    this.userName = userInfo.name;
    window.dispatchEvent(new CustomEvent(WINDOW_EVENT_AUTH, { detail: tokens.access_token }));
    this.requestTokenAfterAccessTokenExpires(tokens);
    this.setUserIdOnNotifications(userInfo.sub);
    this.requestUpdate();
  }

  /**
   * Chercher les composants coquille-notifications et ajouter l'attribut userId
   * Ceci permettra de cibler les notifications envoyées par websocket uniquement à l'utilisateur concerné.
   * @param sub
   */
  setUserIdOnNotifications(sub: string) {
    const notifications = document.getElementsByTagName(APP_NOTIFICATIONS_TAG);
    for (let i = 0; i < notifications.length; i++) {
      notifications[i].setAttribute('userId', sub);
    }
  }

  /**
   * Ajouter une minuterie pour demander un nouveau jeton d'accès avant l'expiration du jeton d'accès actuel.
   * @param tokens
   */
  requestTokenAfterAccessTokenExpires(tokens: TokenSet) {
    if (!tokens?.access_token) {
      return;
    }
    const tokenExpiration = new Date(
      parseToken(tokens?.access_token || '').exp * 1000
    );
    console.info('Token expirera le', tokenExpiration.toLocaleString());
    const tokenTimeout = setTimeout(() => {
      console.info('Token expiré, obtention de nouveaux tokens');
      fechAccessTokenForServices(tokens?.access_token || '', "coquille").then((newTokens) => {
          localStorage.setItem(SESSION_STORAGE_ACCESS_TOKEN, newTokens?.access_token || "");
          window.sessionStorage.setItem(SESSION_STORAGE_ID_TOKEN, newTokens?.id_token || "");
          window.dispatchEvent(new CustomEvent(WINDOW_EVENT_AUTH, { detail: newTokens.access_token }));
          this.requestTokenAfterAccessTokenExpires(newTokens);
      });
      clearTimeout(tokenTimeout);
    }, tokenExpiration.getTime() - Date.now() - 10000);
  }

  render() {
    return html`
      ${this.loggedIn
        ? html`<p>
            ${this.userName}
            <button @click="${this.logout}">Logout</button>
          </p>`
        : html`<button @click="${this.login}">Login</button>`}
    `;
  }

  /**
   * Rediriger vers la page de login (via le service coquille-api-auth).
   */
  login() {
    window.location.href = `${environment.urlServiceAuth}?redirect_uri=${window.location.href}`;
  }

  logout() {
    // TODO : Avoir une vraie route de retour de logout pour faire le ménage
    localStorage.removeItem(SESSION_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(SESSION_STORAGE_ID_TOKEN);
    window.location.href = `${environment.urlServiceAuth}/logout?redirect_uri=${window.location.href}`;
  }
}

export function tokenExpired(token: string) {
  if (!token) {
    return false;
  }
  const decodedToken = parseToken(token);
  const expirationDate = new Date(decodedToken.exp * 1000);
  return Date.now() > expirationDate.getTime();
}

export function parseToken(idToken: string) {
  try {
    const base64Url = idToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  catch (error) {
    console.error('Error:', error);
    return {};
  }
}

export interface TokenSet {
    access_token: string;
    id_token: string;
    refresh_token: string;
}

/**
 * Permets d'obtenir un jeton d'accès pour les services.
 * Le jeton d'accès actuel octroyé à l'utilisateur pour la coquille sera échangé
 * contre un jeton d'accès pour le service (clientId)
 * @param access_token Access token actuel de l'utilisateur pour la coquille
 * @param clientId Client-ID du service pour lequel on veut obtenir un jeton d'accès
 * @returns
 */
export function fechAccessTokenForServices(access_token: string, clientId: string): Promise<TokenSet> {
  return fetch(`${environment.urlServiceAuth}/token?clientId=${clientId}&token=${access_token}&no_auth=true`, {
    credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Réponse de la demande de jeton d\'accès', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return "";
    });
}