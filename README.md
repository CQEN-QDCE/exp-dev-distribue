<!-- ENTETE -->
[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--P-blue)](https://forge.gouv.qc.ca/licence/liliq-p/)

---
![MCN](https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png)
<!-- FIN ENTETE -->

# Expérimentation sur la mise en place d'un modèle de développement applicatif distribué

Est-il possible d'intégrer au sein d'une même application des services développés par des organismes indépendants tout en offrant une expérience utilisateur cohérente? Est-il possible de laisser une autonomie aux contributeurs qui ne sera pas un frein à leur contribution? 

## Hypothèse

**Nous croyons qu’** un modèle de développement distribué basé sur une approche de modules déployés dans une application web/mobile via des pipelines de validation et d’intégration mis à disposition par une équipe produit... 

**Résultera** en une forte adhésion d'éventuels organismes contributeurs en respectant leur autonomie. 

**Ceci sera prouvé si** : 

* Avec la démonstration du modèle avec un prototype web et un prototype mobile ; 

* À travers une recherche utilisateur sur les contributeurs, ceux-ci : 

    * Jugent faciles les conditions d’intégration d’un nouveau service ; 

    * Jugent acceptables les efforts de conversion d’un service existant ;  

* Le modèle de développement peut se mettre à l’échelle et soutenir l’écosystème des organismes contributeurs du secteur publics. 

## Comment utiliser ce dépôt ?
Ce dépôt de code source sert à la fois à documenter et démontrer l'expérimentation. On y trouve d'abord la documentation servant à la mise en place de l'expérimentation. Puis, étant donné que l'expérimentation porte sur la mise en place d'un produit applicatif collaboratif, le dépôt lui-même sert à démontrer comment un dépôt de code public devrait être le véhicule de communication avec la communauté d'éventuels contributeurs. 

La documentation et l'architecture de l'expérimentation est disponible [ici](exp).

Voici un aperçu de l'arborescence du dépôt

 * [exp](exp) : Documentation de l'expérimentation
 * [docs](docs) : Documentation du prototype
 * [app](app) : Code du prototype applicatif (La coquille)
 * [services](services) : Code du prototype des services aux contributeurs 
 * [exemples](exemples): Code des prototypes de services contribués 
 * [demo](demo) : Orchestration des divers prototypes pour démontrer le modèle 

 ## License

Ce projet est sous la Licence Libre du Québec - Permissive (LiLiQ-P) version 1.1. 

Référez-vous au fichier [LICENCE](LICENCE) pour plus de détails.