if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { environment } from '../environment';

import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import { property, customElement } from 'lit/decorators.js';
import { provide, createContext } from '@lit/context';

import { Service } from "../registre/service.interface";
import * as Registre from '../registre/registre-api.js';
import { OrganismesController } from '../registre/organismes-controller';
import { ServicesController } from '../registre/services-controller';

import { AppComponentIsolator } from './app-component-isolator';
import { NavigateEventDetail } from '../definitions/customEvents'
import { servicesContext } from '../registre/services-context';

export const organismesContext = createContext(Symbol('organismes-context'));
export const routerContext = createContext(Symbol('router-context'));

interface State {
    service?: Service,
    query: Record<string, string>;
    params: { [key: string]: string | undefined; };
    url: URL;
}

@customElement('app-service')
export class AppService extends LitElement {
    @provide({context: organismesContext})
    @property({ attribute: false })
    private organismes = new OrganismesController(this);

    @provide({context: servicesContext})
    @property({ attribute: false })
    private services = new ServicesController(this);
  
    //Current state
    currentState: State;
    newState: State | null;

    baseURL:URL = new URL(environment.baseURL);

    constructor() {
        super();
      
        this.newState = {
            query: {},
            params: {},
            service: undefined,
            url: new URL(window.location.href),
        }

        this.currentState = this.newState;
    }
    
    renderService =  () => {
        if (!this.currentState.service) {
            return html`<div>Service introuvable</div>`;
        }
        else if (this.currentState.service?.renderFunction) {
            return this.currentState.service?.renderFunction();
        } 
        else if (this.currentState.service?.url) {
            //Service externe
            const isolator = new AppComponentIsolator();
            isolator.service = this.currentState.service;
            isolator.clientId = this.currentState.service?.orgId;
            return isolator;
        }
        
        console.error("app-service: Le service demandé n'a pas d'url ou de fonction de rendu documentée.")

        return html`<div>Erreur système, veuillez réessayer plus tard.</div>`;
    }

    _onPopState = () => {
        this.navigate(new URL(window.location.href));
    }

    _onAnchorClick = (e:MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) {
            return;
        }

        //Trouver l'élément A cliqué
        const eventTarget = e.composedPath().find((el) => {return ((el as HTMLElement).tagName === 'A')});

        if (!eventTarget) return;

        //Trouver l'attribut href de l'élement A et s'assurer que celui-ci est une route vers un service
        const clickedAnchor = eventTarget as HTMLAnchorElement;

        if (!clickedAnchor.href) return;

        if (clickedAnchor.hasAttribute('download') || clickedAnchor.href.includes('mailto:')) return;
        
        const target = clickedAnchor.getAttribute('target');
        if (target && target !== '' && target !== '_self') return;

        const targetUrl = new URL(clickedAnchor.href);

        //Est-ce un lien local?
        if (targetUrl.host !== window.location.host) return;
    
        e.preventDefault();

        //Est-ce que l'url a vraiment changé?
        if (this.currentState.url.href === targetUrl.href) return;
    
        console.log("app-service: Clic d'un lien valide.", targetUrl);  
        
        this.navigate(targetUrl);
    }

    _onNavigationRequest = (event:CustomEvent<NavigateEventDetail>) => {
        if (!event.defaultPrevented) {
            console.log("app-service: Demande de navigation depuis un composant.", event);
                
            let targetUrl = new URL(this.baseURL.href+event.detail.path);
            
            this.navigate(targetUrl);
        }
    }

    _findNewStateService(services:Registre.Services) {
        console.log("app-service: Recherche du service demandé.", this.newState);
        
        for (const service of services) {
            //Ajout du pattern {/}? pour gérer les 'trailing slashes'
            const pattern = new URLPattern({ pathname: service.chemin+'{/}?'/*, baseURL: this.baseURL*/ });
          
            const match = pattern.exec(this.newState?.url);

            if (match) {
                const updatedNewState:State = {
                    url: this.newState?.url || new URL(this.baseURL), //douteux
                    query: Object.fromEntries(new URLSearchParams(this.newState?.url.search)),
                    params: match?.pathname?.groups ?? {},
                    service: service,
                }

                console.log("app-service: Service trouvé.", updatedNewState);
                
                this.newState = updatedNewState;

                return service;
            }
        }

        console.log("app-service: Service non trouvé.", this.newState);

        return null;
    }

    navigate(url:URL) {
        //Mettre à jour l'état si nécéssaire seulement
        if (this.currentState.url.href === url.href) {
            return;
        }

        this.newState = {
            query: {},
            params: {},
            service: undefined,
            url: url,
        }

        //Méthode de changement d'url
        //window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
        window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);

        this.requestUpdate();
    }

    connectedCallback(): void {
        super.connectedCallback()

        window.addEventListener('popstate', this._onPopState);
        window.addEventListener('click', this._onAnchorClick);
        
        window.addEventListener("navigate-custom-event", this._onNavigationRequest);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()

        window.removeEventListener('popstate', this._onPopState);
        window.removeEventListener('click', this._onAnchorClick);
    }

    render() {
        console.log("app-service: Chargement du service demandé.", this.currentState);  
      
        //Effectuer le render à partir des données du registre
        return html`
          ${this.services.render({
                complete: (services: Registre.Services) => {
                    //Récupérer l'url demandé
                    if (this.newState && this._findNewStateService(services)) {
                        this.currentState = this.newState;
                        this.newState = null;
                    }
                    
                    //Charger le state
                    return this.renderService();

                },
                initial: () => html`<li>Veuillez patienter...</li>`,
                pending: () => html`<li>Veuillez patienter...</li>`,
                error: (e: any) => html`<li>${e}</li>`
          })}
          `;
    }
}
