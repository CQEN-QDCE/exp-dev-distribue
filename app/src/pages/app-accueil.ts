import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-accueil')
export class AppAccueil extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
        <app-search></app-search>
        <app-popular></app-popular>
    `;
  }
}
