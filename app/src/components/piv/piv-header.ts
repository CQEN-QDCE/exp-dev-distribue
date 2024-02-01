import { LitElement, html} from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("piv-header")
export class PivHeader extends LitElement {

    @property({ type: String }) ministere: string = "";
    @property({ type: String }) systeme: string = "";

    render() {
        return html`
        <link type="text/css" rel="stylesheet" href="/css/quebec_ca.css" />
        
        <div class="container-fluid piv">
            <div class="container">
                <div class="row">
                    <div class="col-4 d-flex align-items-center">
                            <a href="/#main" class="visuallyHidden passerContenu" tabindex="1">Passer au contenu</a>
                    </div>
                </div>
                <div class="row" id="entetePiv">
                    <div class="col-4 d-flex align-items-center container_piv" lang="fr">
                        <a tabindex="5" data-evenement="click" href="/"><img id="pivImage" alt="Site Web du Gouvernement du Québec." src="assets/piv/signature-PIV.svg" width="463" height="91"></a>
                        <img id="pivImagePrint" alt="Site Web du Gouvernement du Québec." src="assets/piv/logo-quebec-constraste.png" width="199" height="60">
                    </div>
    
                    <div class="col-8 d-flex justify-content-end align-items-center ">                   
                        <ul class="listePiv">
                            <li><a lang="en" tabindex="20" href="/en/">English</a></li>
                            <li><a tabindex="25" href="https://quebec.ca/nous-joindre/renseignements-generaux">Nous joindre</a></li>
                        </ul>
                    </div>
                
                </div>
            </div>
        </div>
        `
    }
}