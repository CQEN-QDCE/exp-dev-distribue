import { LitElement, html} from "lit";
import { consume } from "@lit/context";
import { property, customElement} from "lit/decorators.js";

import { router } from "../router/router";

import * as Registre from '../registre/registre-api.js';
import { servicesContext } from '../registre/services-context';
import { ServicesController } from '../registre/services-controller';

@customElement("app-popular")
export class AppPopular extends LitElement {
    @consume({context: servicesContext, subscribe: true })
    @property({attribute: false})
    private services: ServicesController
    
    constructor() {
      super();
      
      window.addEventListener(Registre.WINDOW_EVENT_REGISTRE_SERVICES_ASYNC_COMPLETE, (event: any) => {
          this.requestUpdate();
      });
    }

    //TODO: Ajouter une métrique pour trier les services les plus consultés
    render() {
      console.log("app-popular rendered", this.services);  
      
      return html`
        <link type="text/css" rel="stylesheet" href="/css/quebec_ca.css" />
        
        <div class="en-demande"><h2 id="en-demande-titre-113622">Les plus consultés</h2></div>
        
        <nav aria-labelledby="en-demande-titre-113622">
        <ul class="en-demande-liste">
        ${this.services.render({
            complete: (result: Registre.Services) => html`
              ${result.map(i => html`<li><a title="${i.description}" href="#" @click="${() => router.current.navigate(`${i.chemin}/`)}">${i.nom}</a></li>`)}
            `,
            initial: () => html`<li>Initial</li>`,
            pending: () => html`<li>Pending</li>`,
            error: (e: any) => html`<li>${e}</li>`
        })}
        </ul>
        </nav>
        `;
    }
}