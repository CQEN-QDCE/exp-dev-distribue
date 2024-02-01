if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { provide, createContext } from '@lit/context';

import { Service } from "../registre/service.interface";
import * as Registre from '../registre/registre-api.js';
import { OrganismesController } from '../registre/organismes-controller';
import { ServicesController } from '../registre/services-controller';

import { router, updateRouter } from '../router/router';
import { AppComponentIsolator } from './app-component-isolator';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import { ROUTER_EVENT_ROUTE_CHANGED } from '../constants';

import { servicesContext } from '../registre/services-context';

export const organismesContext = createContext(Symbol('organismes-context'));
export const routerContext = createContext(Symbol('router-context'));

@customElement('app-index')
export class AppIndex extends LitElement {
    @provide({context: organismesContext})
    @property({ attribute: false })
    private organismes = new OrganismesController(this);

    @provide({context: servicesContext})
    @property({ attribute: false })
    private services = new ServicesController(this);

    routerRenderCallback =  (service: Service) => {
        const isolator = new AppComponentIsolator();
        isolator.service = service;
        isolator.clientId = service.orgId;
        return isolator;
    }

    firstUpdated() {
        // TODO : Détecter l'événement manifestes-changes pour mettre à jour le routeur
        window.addEventListener(Registre.WINDOW_EVENT_REGISTRE_SERVICES_ASYNC_COMPLETE, (event: any) => {
            const router = updateRouter(
                event.detail.services,
                this.routerRenderCallback
            );

            router.addEventListener(ROUTER_EVENT_ROUTE_CHANGED, () => {
                if ("startViewTransition" in document) {
                    return (document as any).startViewTransition(() => {
                        this.requestUpdate();
                    });
                }
                else {
                  this.requestUpdate();
                }
            });

            this.requestUpdate();
        });
    }

  render() {
      return router.current.render();
  }
}
