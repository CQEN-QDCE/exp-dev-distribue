import { LitElement, html} from "lit";
import { customElement } from "lit/decorators.js";

@customElement("piv-footer")
export class PivHeader extends LitElement {

    render() {
        return html`
        <link type="text/css" rel="stylesheet" href="/css/quebec_ca.css" />
        
        <div class="container-fluid piv_bas" role="contentinfo">
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex">
                    <ul class="list-inline mx-auto justify-content-center">
                        <li>
                            <a href="https://quebec.ca/accessibilite">Accessibilité</a>
                        </li>
                        <li>
                            <a href="https://quebec.ca/acces-information">Accès à l'information</a>
                        </li>
                        <li>
                            <a href="https://quebec.ca/politique-confidentialite">Politique de confidentialité</a>
                        </li>
                        <li>
                            <a href="https://quebec.ca/conditions-utilisation">Conditions d'utilisation</a>
                        </li>
                    </ul>
                </div>
                <div class="col-12 d-flex align-items-center justify-content-center" lang="fr"><a href="https://quebec.ca"><img id="logoFooter" alt="Gouvernement du Québec." src="assets/piv/logo-gouv-couleur.svg" width="117" height="35"></a></div>
                <div class="col-12 d-flex align-items-center justify-content-center"><p><a href="/droit-auteur">© Gouvernement du Québec,&nbsp;2023</a></p></div>
            </div>
        </div>
        <div id="flecheHaut" tabindex="0" role="link"><span class="visuallyHidden">Retour en haut</span></div>
        </div>`;
    }
}