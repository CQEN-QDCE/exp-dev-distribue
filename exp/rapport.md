---
titre : Rapport d'expérimentation
sous-titre : Modèle de développement applicatif distribué
auteur : Centre d'expertise appliquée en innovation
date : 2023-12-01
statut : en cours
---

<!-- ENTETE -->
[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--P-blue)](../LICENCE)
---
![Logo MCN](https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png")
<!-- FIN ENTETE -->

# Modèle de développement distribué 

## 1. Objectifs 

Vérifier qu'un modèle de développement distribué basé sur une approche de micro frontends intégrés à une application hybride web-mobile résulterait en une forte adhésion des organismes contributeurs de services numériques tout en respectant leur autonomie. 

## 2. Contexte 

Est-il possible d'intégrer au sein d'une même application des services développés par des organismes indépendants du secteur public tout en offrant une expérience utilisateur cohérente? Est-il possible de laisser une autonomie aux contributeurs qui ne sera pas un frein à leur contribution? 

Une plateforme comprenant une application hybride web et mobile et offrant des services d’intégrations à ses contributeurs pourrait potentiellement répondre à la question. L’un des principaux enjeux de cette solution est d’intégrer les différents services des organismes tout en leur laissant le plus d'autonomie possible, afin d'assurer leur adhésion au service.  

Bien qu’il n’ait pas été possible de consulter directement de potentiels contributeurs de service, l’équipe d’expérimentation a d’abord identifié ce qui pourrait être les principaux freins à l’adhésion à la plateforme: 

* Les coûts supplémentaires d’intégrations d’un service vers la nouvelle plateforme par rapport à l’actuel. Ces coûts peuvent inclurent par exemple: La montée en compétence sur une pile de développement imposée, l’intégration de nouveaux outils dans la pile actuelles d’un organisme, la ré-implémentation d’un service existant dans la nouvelle plateforme;
* Le service d’intégration à la plateforme peut rapidement devenir un frein l’adhésion si celui-ci n’arrive pas à se mettre à l’échelle au nombre de contributeur potentiel et cause des délais d’attente non raisonnable pour pouvoir intégrer un service. 

Il a été déterminé que ces freins à l’adhésion pouvaient être éliminés en mettant en place certains principes: 

* Des services développés et déployé dans les infrastructures du contributeur et intégré à une application coquille via le [standard *web component*](https://developer.mozilla.org/fr/docs/Web/API/Web_components);
* La liberté dans le choix de la pile de développement pour les services contribués; 
* Un code source unique pour les versions web et mobile de l’application coquille et les services contribués; 
* Que le développement de l’application coquille et des outils d’intégration soit réalisé en mode ouvert dans un dépôt de code source consultable par toute la communauté des éventuels contributeurs de services;
* La publication des services en mode libre-service appuyé par des outils d’intégration et d’assurance qualité automatisés.

Le prototype mis en place dans le cadre de l’expérimentation aurait dû idéalement démontrer le modèle de développement de bout en bout, soit le développement d’un service jusqu’à sa mise en ligne dans l’application hybride coquille. Afin de démontrer le modèle, les cas d’utilisations suivants avait été identifiés: 

* Un nouvel organisme contributeur crée un service 
* Un organisme publie un service dans la plateforme 
* Un citoyen installe la plateforme et effectue une transaction dans un service 

Les délais et les ressources prévus pour l’expérimentation n’ont pas permis la mise en place des prototypes démontrant les cas d’utilisation identifiés. L’expérimentation a plutôt identifié les technologies supportant le modèle qui contenaient les plus d’incertitudes au sein de l’organisme qui serait l’éventuel propriétaire de la plateforme. L’expérimentation s’est donc concentrée sur les questions suivantes: 

* L’architecture potentielle du modèle de développement;
* La viabilité du principe micro frontend et du standard web component; 
* La viabilité des technologies supportant la mise en place d’applications hybrides web-mobile;
* L’avancement technologique des outils d’assurance qualité automatisés pouvant être utilisé sur un composant logiciel hébergé à distance.

## 3. Configuration et installation 

[Rédaction en cours]

## 4. Démarche de l'expérimentation 

### 4.1 Mise en place du modèle de développement distribué 

#### 4.1.1 Distribution du développement 

Le modèle de développement exploré doit encadrer un logiciel dont les principales fonctionnalités seront développées par des équipes externes au produit lui-même. On parle ici d’un modèle qui s’apparente à une “Production participative” (mieux connus sous le terme anglophone crowdsourcing). L’exemple le plus éloquent ce genre d’approche est celui des systèmes d’exploitation d’appareils mobile qui proposent des fonctionnalités étendues par des applications développées par une communauté de développeurs externalisés.  

L’approche de Google pour son système Android (70% du marché mondial) est l’ouverture complète du code source d’Android ainsi que des outils de développement. Les développeurs d’application peuvent récupérer librement toutes les ressources nécessaires pour concevoir une application sur leur infrastructure personnelle. La disponibilité publique totale de toute l’information pour comprendre, créer et publier sur la plateforme a permis de former avec le temps une communauté de millions de développeurs. 

Adaptant ce modèle l’échelle d’une plateforme servant à centraliser des services en ligne, l’expérimentation a mis en place un dépôt de code source sur la plateforme [Github](https://github.com/CQEN-QDCE/exp-dev-distribue). En plus de fournir les fonctionnalités de publication de code source Git, Github propose des services pour organiser une communauté de développeurs autour du produit.  

Ainsi le prototype de communauté utilise les services *Code* et *Releases* pour publier le code de la plateforme et les outils supportant le développement de services. La fonction *Pages* permet de publier la documentation de la plateforme. Finalement les fonctions *Discussions* et *Issues* servent à prendre contact avec la communauté de développeurs. 

Le développement d’un service peut donc être complètement effectué chez le développeur. En revanche, la publication du service dans la plateforme elle doit être encadrée par certaines interactions. De la même manière que Google effectue certaines validations avant de publier une application dans son magasin, une plateforme de services gouvernementaux devrait aussi effectuer un minimum de vérifications avant d’autoriser la publication d’un service. 

Des services aux développeurs sous forme d’API ont donc été ébauchés pour imaginer quels outils seraient nécessaire pour supporter un processus de publication libre-service.  

![Diagramme de conteneurs](https://www.plantuml.com/plantuml/proxy?cache=no&fmt=svg&src=https://raw.githubusercontent.com/CQEN-QDCE/exp-dev-distribue/main/exp/architecture/conteneurs.puml)

Le contributeur de service interagit avec le Registre des services. Des services d’approbation et de publication sous forme d’API REST permettent d’insérer ceux-ci dans un pipeline de déploiement chez le contributeur.   

![Diagramme de flux](https://www.plantuml.com/plantuml/proxy?cache=no&fmt=svg&src=https://raw.githubusercontent.com/CQEN-QDCE/exp-dev-distribue/main/exp/architecture/fluxPublication.puml)

Le processus de publication obligerait de passer l’étape de d’approbation avec succès avant d’invoquer le service de publication. Ce dernier pourrait être invoqué par l’orchestration du déploiement du service du contributeur par exemple. 

En mettant ainsi à profit le modèle de communauté ouverte en libre-service, on vient assurer la prise en charge des développeurs avec un minimum de ressource humaine. Un gestionnaire de communauté peut assurer les interactions avec les développeurs de services, tandis que les mainteneurs du produit prennent connaissance des problématiques directement dans les outils de rapport de bogue. Le reste des interactions sont automatisés grâce à mise en disponibilité d’outils libre-service. 

#### 4.1.2 Distribution du service 

L’approche micro-frontend étant par définition une architecture distribuée, celle-ci permet une multitude de modèle de responsabilités en ce qui attraient à l’hébergement des différentes composantes technologiques necéssaires au déploiement d'un service.

[Diagramme illustrant les composantes technos d’un micro-frontend, application coquille, web component, CND, API, Gateway, etc.] 

L’expérimentation a d’abord tenté d’imaginer divers scénarios possibles.  

**Scénario 1** 

Le contributeur développe, teste et héberge son *web component* lui-même dans un environnement de développement qu’il met en place lui-même à l’aide des outils publiés dans le dépôt de code du service.  Il interagit avec les services développeur du service pour signifier comment rejoindre son micro-service lors de la publication. 

**Scénario 2** 

Le contributeur développe et teste son *web component* lui-même dans un environnement de développement qu’il met en place lui-même à l’aide des outils publié dans le dépôt de code du service. Il déploie la version empaquetée de son service sur l'infrastructure d'hébergement de fichiers statiques de la plateforme à l’aide d'un API développeur. 

**Scénario 3** 

Le contributeur développe et teste son *web component* dans un environnement de développement fournis par la platefome. Des pipelines de déploiement continus incluent des tests obligatoires et déploie le web component sur l’infrastructure d'hébergement statique de la plateforme. 

Répartition des responsabilités du déploiement d’un service

<table border=1>
<thead><tr>
<th></th><th></th><th>Env. Dev</th><th>Tests unitaires</th><th>Empaquetage</th><th>Tests intégration</th><th>Hébergement</th><th>Avantages</th><th>Inconvénients</th>
</tr></thead>
<tbody>
<tr>
<td rowspan=2>Scénario 1</td><td>Contributeur</td><td>✅</td><td>✅</td><td>✅</td><td></td><td>✅</td>
<td rowspan=2>- Autonomie presque totale des contributeurs<br>- Infrastructure minimale de plateforme</td>
<td rowspan=2>- Contrôle minimal sur le respect des règles d’intégration<br>- Disparité des serveurs de composants.</td>
</tr>
<tr>
<td>Plateforme</td><td></td><td></td><td></td><td>✅</td><td></td>
</tr>
<tr>
<td rowspan=2>Scénario 2</td><td>Contributeur</td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td>
<td rowspan=2>- Autonomie des contributeurs<br>- Control étroit de la publication des services </td>
<td rowspan=2>- Déploiement d’un service d’hébergement </td>
</tr>
<tr>
<td>Plateforme</td><td></td><td></td><td></td><td>✅</td><td>✅</td>
</tr>
<tr>
<td rowspan=2>Scénario 3</td><td>Contributeur</td><td></td><td></td><td></td><td></td><td></td>
<td rowspan=2>- Intégration très forte des composants au niveau des normes fonctionnelles</td>
<td rowspan=2>- Faible autonomie des contributeurs<br>- Processus embarquement lourd<br>-Infrastructure et charge de travail plateforme lourde</td>
</tr>
<tr>
<td>Plateforme</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
</tr>
<tbody>
</table>

L’expérimentation a choisi de proposer le scénario 1 comme solution pour les raisons suivantes: 

* Plus grande autonomie pour les contributeurs 
* Infrastructure de plateforme minimale  
* Plus léger en ressource pour l’équipe plateforme 

### 4.2 Prototype d’application hybride publiant des web component 

#### 4.2.1 Modes d’accès à l’application 

Pour assurer aux contributeurs de services de pouvoir rejoindre leurs utilisateurs via un navigateur sur grand écran ou sur un appareil mobile, l’application coquille se doit d’être *responsive*, ce qui signifie qu’elle doit présenter des interfaces qui s'adaptent automatiquement aux deux modes d’affichage. Bien qu’ils aient un espace d’affichage restreint, les appareils mobiles apportent en contrepartie certaines fonctionnalités qu’un service unifié voudrait vouloir offrir, comme par exemple, la distribution via un *app store*, la prise en charge de fonctionnalités native (GPS, caméra, lecteur d’empreinte, etc) ou encore la notification poussée.  

Afin de minimiser les ressources nécessaires au développement et entretient de la plateforme ainsi que des services publiés, une approche de “code source unique” a été exploré. On parle ici d’application hybride, soit une application développée dans un langage ou un framework permettant d’empaqueter et de distribuer celle-ci sur le web ainsi qu’en tant qu’application sur les principales plateformes mobile. 

Les outils disponibles pour développer des applications hybrides se divisent en trois approches: 

* **Progressive Web Applications**

    Les applications web progressives sont des applications web qui utilisent des fonctionnalités d’un navigateur pour donner une expérience d’utilisation comparable à celle d’une application native. Quand on navigue sur une telle application, un navigateur compatible donne la possibilité de créer un raccourci dans le menu du système d’exploitation qui permet d’ouvrir l’application comme si elle était native.

    Par contre, l’application étant dans les faits exécutée par le navigateur, celle-ci se limite à l’accès aux fonctionnalités natives de celui-ci. Bien que [de plus en plus de fonctionnalités soit standardisées et rendues accessibles au navigateur](https://whatpwacando.today/), il y aura toujours un certain fossé avec ce que l’exécution native peut offrir. 

    Au moins un outil permet cependant d’empaqueter une PWA dans une application native mobile: [PWA Builder](https://docs.pwabuilder.com). Par contre, l’outil ne change rien à l’accès au fonctionnalités native et dépend de la méthode d’hébergement de l’application. Son principal attrait consiste à rendre disponible la distribution de l’application via les *app stores* des fournisseurs mobiles.

* **Couche d’accès multi-plateformes**

    Les couches d’accès multi-plateformes (*Cross-platform Native Runtime*) sont des librairies de codes utilisables dans des applications web permettant d’accéder aux fonctionnalités natives des systèmes mobiles combinées à un outil d’empaquetage pouvant construire des applications natives. L’utilisation de ces librairies permet de prendre à peu près n’importe quel langage ou framework web pour construire une application multi-plateforme distribuable dans les *app stores* ou exécutable dans un navigateur. 

    L’utilisation de ces librairies permet de prendre une approche de développement orientée d’abord pour le web et la rendre mobile sans trop de compromis. On s’assure ici une très forte compatibilité avec les standards du web, tel que les *web components*, ce qui se traduit par de meilleures performances, une accessibilité rehaussée ainsi qu’une meilleure affinité avec les algorithmes de classement des moteurs de recherche. 

    Les principales librairies de couche d’accès multi-plateforme sont [Capacitorjs](https://capacitorjs.com/docs), [Nativescript](https://docs.nativescript.org/) et [Cordova](https://cordova.apache.org/docs/en/latest/).  

* **Frameworks hybrides**

    Les frameworks de développement hybrides ont été créé précisément pour concevoir des applications distribuables à la fois sur mobile sur le web. Ils utilisent dans la plupart des cas des langages de programmation qui ne sont pas basés sur l’écosystème javascript et utilisent un processus de compilation/transpilation pour créer un exécutable compatible avec la plateforme voulue.  

    Leurs cas d’utilisations principaux est le développement applicatif avec interfaces qui se rapprochent le plus possible d’une expérience native. Cette spécialisation fait que ces frameworks se prêtent moins bien au développement de site ou de portail web. En effet, le rendu web (HTML/CSS/JS) étant le résultat d’une transpilation, il est difficile de contrôler le rendu final du portail et ainsi d’assurer une bonne compatibilité avec les standards du web ou encore d’assurer l’affinité avec les algorithmes de classement des moteurs de recherche.  

    Les principaux frameworks de développement hybride sont[Flutter (Google)](https://flutter.dev/), [Blazor (Microsoft)](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) et [React Native for Web (Meta)](https://necolas.github.io/react-native-web/)	 


[Tableau comparatif des technologies considérées] 

L’approche de la couche d’accès aux fonctionnalités natives, n’imposant pas de framework ou de langage de programmation et se prêtant bien à la mise en place d‘un portail web basé sur le standard web component est le choix qui cadrait le mieux pour l’expérimentation. Nous sommes donc aller de l’avant, pour le prototype d’application coquille, avec une approche web minimaliste développé en Typescript avec le support d’une librairie de support aux web component nommée Lit Element (https://lit.dev).  

#### 4.2.2 Couche d’accès aux fonctionnalités mobiles natives 

[Expérimentation toujours en cours.]

#### 4.2.3 Intégration d’un web component 

Un *web component* est un fragment d'application web réutilisable rendu possible par l’assemblage de trois dispositions du standard HTML: 

* [Les éléments personnalisés (custom elements)](https://developer.mozilla.org/fr/docs/Web/API/Web_components/Using_custom_elements)
* [Le Shadow DOM](https://developer.mozilla.org/fr/docs/Web/API/Web_components/Using_shadow_DOM)
* [Les gabarits HTML (template)](https://developer.mozilla.org/fr/docs/Web/API/Web_components/Using_templates_and_slots)

Pour créer un *web component*, il suffit de créer une classe *javascript* qui hérite de la classe standard [*HTMLElement*](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement). On doit ensuite inscrire le composant en tant qu'élément personnalisé dans le registre d’éléments personnalisé [*customElement*](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) du DOM. 

```javascript
customElements.define('exemple-composant', 
  class extends HTMLElement { 
    constructor() { 

      super(); 

      const pElem = document.createElement('p'); 

      //Activation du ShadowDom  
      const shadowRoot = this.attachShadow({mode: 'closed'}); 
      shadowRoot.appendChild(pElem); 
    } 
  } 
); 
 ```

Ensuite le composant est inclus dans un document HTML par sa balise personnalisée.
 
```html
<!DOCTYPE html> 
<html> 
  <head> 
    <meta charset="utf-8"> 
    <title>Exemple</title> 
    <script src="main.js" defer></script> 
  </head> 
  <body> 
    <exemple-composant>Contenu exemple</exemple-composant> 
  </body> 
</html> 
 ```
 
Ici, le script inclus contient le code vu plus haut qui effectue la déclaration et l’ajout au registre local du web component. Ce script peut être hébergé n’importe où et importé via la balise standard [*script*](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) ou encore par l’instruction [*import/from*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). Cette fonctionnalité standard règle ici le problème de la distribution du code des contributeurs de notre modèle de développement distribué.  

#### 4.2.4 Implémentation d’un service transactionnel en web component 

Implémenter un service transactionnel complet dans un seul élément personnalisé peut devenir rapidement complexe si on utilise directement les fonctionnalités de l’API HTML standard. C’est pourquoi plusieurs *frameworks* de développement web offrent des fonctionnalités pour empaqueter une application sous forme de *web component*.  

Les trois leaders du marché (React, Vue, Angular) supportent effectivement la création de web components. [(À noter qu’un support complet et natif fait toujours l’objet de travaux du côté de React)](https://github.com/facebook/react/issues/11347) 

https://angular.io/guide/component-overview 

https://react.dev/reference/react-dom/components#custom-html-elements 

https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue 

Des librairies spécialisées dans la prise en charge des *web components* standards ont aussi émergés ces dernières années. [*Lit*](https://lit.dev/) et [*Stencils*](https://stenciljs.com/) en sont des exemples. Ces librairies peuvent être ajoutées à un projet implémenté dans un des *frameworks* populaires, comme *Angular*, pour faciliter le découpage et la distribution de l’application sous forme de web components.  

[Expérimentation toujours en cours.]

#### 4.2.5 Implémentation du principe micro-frontend au modèle distribué 

[Expérimentation toujours en cours.]

#### 4.2.6 Authentification unique et propagation de session utilisateur 

[Expérimentation toujours en cours.]

### 4.3 Prototype d’un guide d’intégration et d’assurance qualité 

Suivant le modèle de responsabilité choisi (Voir 4.1.2 Distribution du service), le périmètre d’expérimentation sur l’assurance qualité concerne essentiellement la validation de l’interface utilisateur de la couche de présentation des services contribués. Nous n’adresserons donc pas les essais unitaires et fonctionnels de ces derniers. 

#### 4.3.1 Approche d’intégration des micro-interfaces (MFE) 

Le choix d’une intégration à l’exécution (runtime) des services sous forme de web component plutôt que par la compilation, a l’avantage d’autonomiser les équipes contributeurs quant au développement, à la construction et au déploiement des versions. Les équipes peuvent rester autonomes et travailler sur un référentiel de code distinct, posséder leur propre pipeline, et déployer à une cadence indépendante des autres équipes. Cependant, dû à la forte relation structurelle entre l’application coquille et les web components, de nombreux défis peuvent s'avérer complexes à gérer. Notamment, la cohérence et la consistance de l’interface utilisateur ainsi que la performance globale du rendu des composants intégrés. 

#### 4.3.2 Approche de validation de l’intégration 

L’arrimage des web components à l'application coquille soulève des risques au niveau du rendu final. L’application finale devrait continuer à respecter la charte d’intégration validée par les essais unitaires et d'intégration. Ces aspects devront être vérifiés à chaque publication, que ce soit au niveau des composants qu’au niveau de la solution globale. Pour ce faire, trois types de validation sont proposées:  

* Cohérence et consistance visuelle 
    * Utilisation d’un système de conception UX standardisé pour garantir une apparence cohérente.
    * L’application de l’encapsulation de style via les modules CSS ou modules SASS ou *Shadow DOM* avec isolation de style. 

* Accessibilité de l’interface utilisateur 
    * Conformité aux [standards adoptés par le gouvernement du Québec](https://www.tresor.gouv.qc.ca/accessibilite).

* Performance globale de la solution 
    * Le téléchargement de composants frontaux devrait représenter environ 80 % du temps de chargement des pages.
    * Diminuer la complexité du code de l’interface utilisateur en mettant en œuvre les meilleures pratiques telles que la réduction du *JavaScript*, la réduction du nombre de requêtes HTTP effectuées par page et la mise en œuvre de techniques de mise en cache appropriées afin d’améliorer la performance. 
    * Privilégier l’utilisation des réseaux de diffusion de contenu (CDN) proche des utilisateurs afin de diminuer la latence réseau.
    * Minimiser le transfert de données entre l’utilisateur et l’application afin de minimiser la latence réseau. 	 

#### 4.3.3 Système de validation des règles d’intégration 

La validation des règles d’intégration consiste à effectuer des essais de régressions afin de s'assurer que les composants publiés ne brisent pas l’application coquille. Voici une synthèse des essais effectués dans le cadre de l'expérimentation:

* **Analyse statique code CSS** 
    * Un analyseur syntaxique implémenté dans le pipeline permet de détecter les erreurs de syntaxe CSS et les écarts flagrants par rapport aux meilleures pratiques standard. 
    > Outils : [csslint](https://github.com/CSSLint/csslint), [stylelint](https://stylelint.io/), [cssnano](https://cssnano.co/).
    * Analyser le code CSS statique pour détecter les problèmes d'incompatibilité du navigateur avec les éléments de l'interface utilisateur. 
    > Outils : [stylelint-no-unsupported-browser-features](https://github.com/RJWadley/stylelint-no-unsupported-browser-features), [eslint-plugin-caniuse](https://github.com/amilajack/eslint-plugin-compat). 
     
* **Validation visuelle de l’interface** 

    Pour valider les erreurs de logiques autres de ceux de la syntaxe, les essais de régression visuelle doivent être effectués sur chaque plate-forme, navigateur et type d'appareil afin de servir de filet de sécurité. Il s’agit de vérifier la cohérence visuelle lorsqu’une page change, à l’ajout et suppression de fonctionnalités. Les vérifications sont basées sur la visibilité, les coordonnées, la taille des éléments de page. Plusieurs approches peuvent se combiner, parmi lesquelles :  

    * Écrire du code pour vérifier les propriétés CSS appliquées aux éléments (par exemple, un test pour vérifier si `border-width=10px`) 
    * Analyser le DOM, Cette validation restitue la structure du DOM réelle des composants à l'aide de moteurs de rendu de test et comparent les résultats à la structure attendue. 
    * Utiliser l’IA pour reconnaître les changements sur la page, tout comme le feraient les yeux humains. 
    * Prendre une capture d'écran de la page et la comparer pixel par pixel avec une capture d'écran de base attendue. 

* **Validation de la performance** 

    Le code de l’interface utilisateur (IU) est responsable de 80 % ou plus du temps de chargement moyen d’une application. Les essais de performances de IU consistent à vérifier le délai de rendu des composants d’interface par le navigateur, il est basé sur le modèle [RAIL de Google](https://web.dev/articles/rail?hl=fr), dont les métriques essentielles sont suivantes : 

    * *Largest Contentful Paint (LCP)*: mesure les performances de chargement. Valeur recommandé : 2.5sec au plus. 
    * *First Input Delay (FID)*: mesure l'interactivité. Valeur recommandé : 100ms. 
    * *CLS (Cumulative Layout Shift)*: mesure la stabilité visuelle. Pour offrir une bonne expérience utilisateur. Valeur recommandée : 0.1 au plus. 

    Ces métriques devront être modulées en fonction des expériences des utilisateurs, tenant compte des types d’appareils (ordinateur de bureau, mobile, tablette), de fabricants, selon la bande passante (WiFi, 3G, 4G, 5G),  

* **Validation d'accessibilité de l’interface** 

    Voir le guide de conformité : https://www.tresor.gouv.qc.ca/accessibilite.

Outils testés

<table border=1>
<thead><tr>
<th>Validations</th><th>Outils manuels</th><th>Outils d’intégration continue (CI)</th>
</tr></thead>
<tbody>
<tr><td>Analyse statique code CSS</td><td colspan=2>csslint, stylelint, cssnano</td></tr>
<tr><td>Essais visuels</td><td colspan=2>Comparaison image: BackstopJS, Cypress, Storybook, WebdriverIO, Applitools Eyes<br>Tests du DOM : React-Test-Renderer, Jest<br>Capture de page: percy, applitools Eyes Visual AI, lamdatest, playwright, WebdriverIO.</td></tr>
<tr><td>Essais de performance</td><td>WebPageTest, Lighthouse, PageSpeed Insights, Chrome DevTools.</td><td>WebdriverIO, Lighthouse CI</td></tr>
<tr><td>Essais	d'accessibilité</td><td>Analyse statique : Codelyzer, eslint-plugin-jsx-a11y.<br>Test manuels : wave, Lighthouse </td><td>axe-core, Pa11y CI et Lighthouse CI</td></tr>
<tr><td>Tests multi-navigateurs</td><td>Analyse statique code : stylelint-no-unsupported-browser-features, plug-in eslint-plugin-caniuse.</td><td></td></tr>
</tbody>
</table>

#### 4.3.4. Stratégie d’implémentation 
Nous préconisons d'intégrer le principe du test précoce aussi appelé *shift left* qui préconise d’effectuer les essais/validations plus tôt dans le cycle de développement. Nous pouvons décliner la démarche d’implémentation comme suit :

> Légende : **Visual** : essais visuels, **Perf**: essais de performance, **A11Y**: essais d’accessibilité. 


* **Étape de l’analyse** 
    * Identification des navigateurs à considérer, les types d’appareils. `Visual` 
    * Décrire chaque cas de test visuel de niveau composant ou de niveau shell. `Perf` 
    * Inclure les KPI de chaque récit comme critère de d’acceptation. `Perf` 
    * Décrire chaque cas de test de performance comme critère de d’acceptation. `Perf` 
    * Décrire les cas de test de la conception graphique en lien avec l’A11Y. `A11Y` 
    * Décrire le processus de validation de l’A11Y des utilisateurs. `A11Y` 
* **Étape de développement** 
    * Analyse statique du code pour la compatibilité des navigateurs. `Visual` 
    * Analyse statique du code CSS. `Visual` 
    * Essais du DOM des composants. `Visual` 
    * Valider les performances de l’IU pour chaque récit `Perf` 
    * Vérifier la liste de contrôle de l’A11Y. `A11Y` 
    * Effectuer l’analyse statique du code (eslint-plugin-jsx-a11y, Codelyzer). `A11Y` 
    * Effectuer la validation de l’A11Y via axe-core et/ou Lighthouse. `A11Y` 
* **Pendant l’intégration continue** 
    * Effectuer les essais visuels de la solution sur la couverture (navigateurs, appareils). `Visual` 
    * Valider les tests de performance de l’IU. `Perf` 
    * Effectuer la validation de l’A11Y via axe-core et/ou Pa11y-CI, Lighthouse CI. `A11Y`
    * Effectuer les essais fonctionnels en lien avec l’A11Y `A11Y`
* **Une fois le récit complété** 
    * Effectuer les essais manuels de la solution sur la couverture (navigateurs, appareils). `Visual` 
    * Vérifier la liste de contrôle de l’A11Y via WAVE/Lighthouse Audit. `A11Y` 
    * Effectuer les essais fonctionnels de lecture d’écran et saisie clavier. `A11Y` 
    * Effectuer les essais exploratoires pour vérifier les goulots d'étranglement. `Perf` 
* **Une fois l’incrément de production disponible (release)** 
    * Effectuer les essais sur différents dispositifs d'assistance. `A11Y` 
    * S’arrimer avec la norme WCAG en vigueur au gouvernement. `A11Y` 
    * Valider les tests de performance de l’IU `Perf` 

## 5. Analyse des résultats 

L'hypothèse d'expérimentation avait comme objectif de vérifier si un modèle de développement distribué basé sur une approche microfrontend pouvait produire les conditions favorables à un service unifié d’accès à des services gouvernementaux distribué dans divers organismes. Trois marqueurs devaient démontrer l’hypothèse: 

* La démonstration du modèle avec un prototype web et un prototype mobile ; 
* Un jugement favorable des conditions d’intégration au modèle par des contributeurs potentiels; 
* Une démonstration que le modèle de développement peut se mettre à l’échelle d’une équipe produit fixe et soutenir un éventuel écosystème de contributeurs.  

Il n’a pas été possible de présenter le modèle à d’éventuels contributeurs au moment d’écrire ce rapport. Ce marqueur n’y sera donc pas vérifié. 

### 5.1 Démonstration du modèle avec un prototype web et un prototype mobile 
[Expérimentation toujours en cours] 

### 5.2 Mise à l’échelle du modèle pour une équipe produit 

## 6. Conclusion 

## 7. Références 

* https://stackoverflow.blog/2023/11/08/the-product-approach-to-open-source-communities/ 
* https://fr.wikipedia.org/wiki/Production_participative 
* https://source.android.com/?hl=fr 
* https://support.google.com/googleplay/android-developer/answer/9859751?hl=fr 
* https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps 
* https://w3c.github.io/manifest/ 
* https://w3c.github.io/ServiceWorker/ 
* https://dev.to/this-is-learning/the-different-strategies-to-building-a-cross-platform-app-3p56 
* https://developer.mozilla.org/en-US/docs/Web/API/Web_Components
    