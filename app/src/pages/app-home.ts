import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-home')
export class AppHome extends LitElement {
  constructor() {
    super();
  }

  async firstUpdated() {
    console.log('Coquille chargée.');
  }

  render() {
    return html`
        <app-popular></app-popular>
    `;
  }
}
