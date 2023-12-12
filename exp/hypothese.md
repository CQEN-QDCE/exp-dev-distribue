---
titre : Hypothèse
sous-titre : Modèle de développement applicatif distribué
auteur : Centre d'expertise appliquée en innovation
date : 2023-08-03
statut : terminé
---


<!-- ENTETE -->
[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--P-blue)](../LICENCE)
---
![Logo MCN](https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png)
<!-- FIN ENTETE -->

# Modèle de développement applicatif distribué 

## Contexte 

Est-il possible d'intégrer au sein d'une même application des services développés par des organismes indépendants du secteur public tout en offrant une expérience utilisateur cohérente? Est-il possible de mettre en place un modèle de développement qui laisse une autonomie aux contributeurs et ne sera pas un frein à leur contribution? 

L’un des principaux enjeux d'une telle plateforme est l'intégration dans une application web des différentes fondations numériques et des services en lignes gouvernementaux tout en permettant aux responsables des services, d’être le plus autonome possible dans le développement et le déploiement. 

## Hypothèse[^1]

**Nous croyons qu’** un modèle de développement distribué basé sur une approche de modules déployés dans une application hybride web et mobile via des pipelines de validation et d’intégration mis à disposition par une équipe produit... 

**Résultera** en une forte adhésion des organismes contributeurs en respectant leur autonomie. 

**Ceci sera prouvé si :** 

* Avec la démonstration du modèle avec un prototype web et un prototype mobile ; 
* À travers une recherche utilisateur sur les contributeurs, ceux-ci : 
    * Jugent faciles les conditions d’intégration d’un nouveau service ; 
    * Jugent acceptables les efforts de conversion d’un service existant ;  
* Le modèle de développement peut se mettre à l’échelle et soutenir l’écosystème des organismes contributeurs du secteur publics. 

## Méthode 

À travers une recherche utilisateur, il faut identifier les conditions acceptables des éventuels contributeurs à la solution. Pour ce faire, une enquête sur les besoins et contraintes des organismes devra être effectuée. Les informations acquises au cours de cette enquête seront des intrants au modèle de développement.

Des prototypes de portail web et d’application mobile seront construits sur une base de code unique. Ces prototypes serviront à vérifier la faisabilité d'une approche d’architectures logiciel modulaire.

L’approche micro-frontend consiste à intégrer des modules applicatifs construit sur le standard *web component*. Cette approche sera validée à la fois sur l’application mobile ainsi que sur le portail web afin de mesurer le potentiel de réutilisation du même module sur les deux plateformes et cela, de manière conforme aux deux applications. L’utilisation de services fournis par l’application parente comme par exemple, de pouvoir obtenir l’authentification de l’usager et la propager à son propre backend, sera validée. Tout en permettant aux contributeurs, responsables des services, d’être le plus autonomes possible dans la gestion de leurs services.

L’uniformité des services intégrés à la plateforme est primordiale pour assurer la meilleure expérience utilisateur possible. Divers outils pour encadrer la création d’interface utilisateurs pour modules micro-frontend seront mis à l’essai pour s’assurer que ceux-ci respectent le programme d'identification visuel du gouvernement du Québec. Une solution offrant le meilleurs ratio “liberté technologique”/ ”intégration fonctionnelle simplifié” devra être identifié. 

Pour coordonner les contributions, un dépôt de code source accessible à toute la communauté gouvernementale doit être mis en place. Ce dépôt doit implémenter tous les outils nécessaires pour accueillir les services contribués, mais aussi publier toute l’information nécessaire à la création d’un service et aussi de communiquer efficacement avec l’équipe produit. 

Pour assurer la mise à l’échelle du modèle de développement, l’automatisation sera essentielle. Des mécanismes permettant de déployer de manière continue les nouvelles versions des applications suite à chaque contribution seront implémentés et documentés. 

Finalement, le modèle de développement distribué sera présenté aux organismes qui pourraient potentiellement y publier des services dans afin de mesurer leur évaluation de la complexité de participation. La prise de commentaires lors de cette deuxième consultation pourrait apporter des modifications au prototype. 


## Références 
* https://martinfowler.com/articles/micro-frontends.html 
* https://www.gartner.com/en/articles/what-is-a-superapp 

[^1]: Énoncé basé sur le principe du [*Hypothesis-driven development*](https://www.ibm.com/garage/method/practices/learn/practice_hypothesis_driven_development) (IBM Garage Methodology, Adrian Cho, 2023)