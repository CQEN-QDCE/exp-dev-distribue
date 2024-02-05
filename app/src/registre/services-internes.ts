
import { html } from 'lit';
import { Services } from './registre-api';

/**
 * La coquille utilise une architecture basée sur les *web components* pour ses services internes. Ceux-ci sont consignés dans un registre interne (*registre.ts*) qui est basé 
 * sur la même interface que le registre des services externes. Ces services internes sont à leur tour basé sur une composition de *web components* définis dans le répertoire components.
 */
export const servicesInternes:Services = [
    {
        orgId: "0",
        nom: "Accueil", 
        customElementName: "app-accueil",
        description: "Page d'accueil",
        chemin: "/",
        version: "1.0.0",
        status: "actif",
        public: true,
        renderFunction: () => {
            import ('../pages/app-accueil');
            return html`<app-accueil></app-accueil>`
        }
    }
]
