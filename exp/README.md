# Expérimentation sur la mise en place d'un modèle de développement applicatif distribué

## Prototypes

### Applications

Démontrer la faisabilité technique de l'utilisation de micro-frontend dans une application hybride web-mobile. 

* Application web et mobile sur une base de code unique (PWA) 
* Intégration de web component tiers via mécanisme sécuritaire
* API client unifiée (web/mobile) permettant la communication entre la coquille et un web component.  
* Authentification à un serveur OAuth et propagation de session dans un web component (propagation des identifiants (usager, session, etc) via l'API client) 

### Dépôt de code source

Comment un produit applicatif dont les services sont contribués par des contributeurs externes communique l'information et les outils nécessaire pour y publier un service? Démontrer que l'utilisation d'un dépôt de code source public est le meilleur moyen de rejoindre et communiquer avec les éventuels développeurs.  

* Modèle gouvernance du produit (équipe produit (coquille), spécifications d'un service, règles d'intégration d'un service) 
* Dépôt de code source 
* Exemples d'utilisation des outils de communication avec l'équipe produit (Issues, Discussions, Wiki, Releases) 
* Déploiement d'un environnement de test à partir d'un clone du dépôt pour développer et tester un service dans la coquille. 

### Validation des normes fonctionnelles d'un service contribué 

Vérifier les limites technologiques à l'assurance qualité automatisée des services contribués en mettant en place un processus automatisé qui contiendrait les fonctionnalités suivantes: 

* Intégration dans la version actuelle de la coquille sans erreur. 
* Respect des normes UI (accessibilité, police caractères, couleurs, PIV, etc.) 
* Respect des normes comportementales (validation des champs de saisie, navigation, aide contextuelle, etc.) 

### Intégration continue 

Comment gère-t-on la publication des changements dans un modèle de développement décentralisé? Un mécanisme automatisé doit permettre d’assurer que les services validés précédemment sont bien ceux servi par la coquille. Un registre de composants qui gère les contributeurs et leurs contributions pourrait contenir les fonctionnalités suivantes:

* Suivi des versions des composants publiés 
* Assurer la sécurité du processus de contribution
* S'intégrer dans les *pipelines* de déploiement continus des contributeurs

## Cas à démontrer

### Nouvel organisme contributeur d'un nouveau service

### Organisme contributeur existant effectue mise à jour d'un service

### Citoyen effectue une transaction dans un service via un navigateur

### Citoyen effectue une transaction dans un service via un appareil mobile

## Architecture de la solution

### Systèmes
![Diagramme de système](https://www.plantuml.com/plantuml/proxy?cache=no&fmt=svg&src=https://raw.githubusercontent.com/CQEN-QDCE/exp-dev-distribue/main/exp/architecture/systeme.puml)

### Conteneurs
![Diagramme de conteneurs](https://www.plantuml.com/plantuml/proxy?cache=no&fmt=svg&src=https://raw.githubusercontent.com/CQEN-QDCE/exp-dev-distribue/main/exp/architecture/conteneurs.puml)
