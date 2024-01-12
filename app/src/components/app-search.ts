import { LitElement, html} from "lit";
import { customElement} from "lit/decorators.js";

//TODO Implémenter la recherche de services

@customElement("app-search")
export class AppSearch extends LitElement {

    render() {
        return html`
        <link type="text/css" rel="stylesheet" href="/css/quebec_ca.css" />
        
        <div class="container-fluid rangee-1 rangee-1-accueil">
            <div class="container">
                <div class="titre_accueil">
                        <h1 class="h1 title-orange-bar">Gouvernement du Québec</h1>
                </div>
            </div>
        </div>
        <div class="container-fluid rangee-1 rangee-1-accueil">
            <div class="container">
				<div class="row">
                    <div class="col-11 col-md-8">
                        <p class="intro-accueil">Services gouvernementaux en ligne</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-12 col-lg-9">
                        <div class="tx_solr clearfix">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="tx-solr-search-form">
                                        <form method="get" id="tx-solr-search-form-pi-results" action="/resultats-de-recherche" data-suggest="/resultats-de-recherche?type=7384" data-suggest-header="Meilleurs Résultats" accept-charset="utf-8">
                                            <div class="input-group">
                                                <input type="text" title="Recherche" placeholder="Décrire votre besoin." class="tx-solr-q js-solr-q tx-solr-suggest  form-control" name="tx_solr[q]" value="">
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default tx-solr-submit" type="submit">
                                                    <span>Recherche</span>
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-md-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}