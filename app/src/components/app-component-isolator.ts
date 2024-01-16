/**
 * Composant qui sert à isoler les composants importé de l'externe
 *
 * Il permet :
 *   1) encapsuler les composants dans un shadow DOM
 *   2) normaliser les propriétés et les événements
 *   3) importer et générer dynamiquement le composant à partir de son nom et de son URL (pour le lazy loading)
 *      - le composant est importé dynamiquement
 *      - le composant est généré dynamiquement
 *      - le composant est ajouté au shadow DOM
 */

import { LitElement, html } from 'lit';
import { Service } from "../registre/service.interface";

import { customElement, property } from 'lit/decorators.js';
//import { TokenSet, fechAccessTokenForServices } from './app-auth';
//import { SESSION_STORAGE_ACCESS_TOKEN, WINDOW_EVENT_AUTH } from '../constants';

@customElement('app-component-isolator')
export class AppComponentIsolator extends LitElement {

    @property({ type: Object }) service: Service | undefined;
    @property({ type: String }) clientId: string | undefined;

    private imported: boolean = false;
    private appComponent: HTMLElement | undefined;
    //private tokens: TokenSet | undefined;

    firstUpdated() {
        if (!this.service) {
            console.error("Le service demandé n'est pas inscrit au registre.");
        }

        // Ajouter un eventListener pour écouter l'événement d'authentification
        /*
        window.addEventListener(WINDOW_EVENT_AUTH, () => {
            this.requestUpdate();
        });
        */

        // Importer le composant
        if (this.service?.url && !this.imported) {
            import(this.service?.url /* @vite-ignore */)
                .then(() => {
                    console.info('Import du web component complété : ', this.service?.url);
                    this.imported = true;
                    this.requestUpdate();

                    /*
                    const accessToken = localStorage.getItem(SESSION_STORAGE_ACCESS_TOKEN) || "";
                    
                    if (!!accessToken && !!this.clientId) {
                        fechAccessTokenForServices(accessToken, this.clientId).then((tokens) => {
                            console.log(`Tokens pour ${this.clientId}`, tokens);
                            this.tokens = tokens;
                            this.requestUpdate();
                        });
                    }
                    else if(!accessToken && !!this.clientId) {
                        this.requestUpdate();
                    }
                    else {
                        console.error('Le clientId n\'est pas défini.');
                    }
                    */
                })
                .catch((reason: any) => {
                    console.error('Import du web component non complété : ', reason);
                    this.imported = false;
                });
        }
    }

    render() {
        const tagName = this.service?.customElementName || "";
        if (!tagName) {
            console.error("Balise du service non inscrite au registre.");
            return html`<div>Erreur système, veuillez réessayer plus tard.</div>`;
        }

        if (this.imported) {
            this.appComponent = document.createElement(tagName);
            console.info('Component Isolator: Élément créé : ', this.appComponent);
        }

        if (this.appComponent) {
            /*
            const tokens = {
                bearerToken: this.tokens?.access_token ,
                idToken: this.tokens?.id_token
            };

            (<any>this.appComponent).tokens = tokens;
            */

            return html`
                <!-- L'utilisation du dom-observer sert à démontrer en partie l'isolation du composant -->
                <dom-observer></dom-observer>
                <!-- Component de l'OP -->
                ${this.appComponent}
            `;
        }

        return html`<div>Erreur: Composant externe non défini</div>`;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this.attachShadow({ mode: 'closed' });
    }
}
