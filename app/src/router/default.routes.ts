import { html } from 'lit';
import { RouteDefinition } from '@thepassle/app-tools/types/router';

export const defaultRoutes:RouteDefinition[] = [
    {
        path: "/",
        title: 'Services en ligne du Gouvernement du Québec - Accueil',
        render: () => {
            import ('../pages/app-home');
            return html`<app-home></app-home>`
        }
    }
]
