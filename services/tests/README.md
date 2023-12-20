# Tests automatisés


Le principale objectif de ce projet est celui de jeter les bases d'un cadre de développement de tests automatisés pour valider des modèles de développement applicatif. Il est surtout spécialisé dans les essais d'interface web sur plusieurs combinaisons de version de plateforme de bureau, de mobile et de navigateur. On y trouve des essais automatisés d'accessibilité, fonctionnels, de performance ainsi que des essais visuels d'interface. 

Ce cadre utilise plusieurs technologies, parmi lesquelles [WebdriverIO](https://webdriver.io/), [Appium](https://webdriver.io/), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) , [DevTools](https://developer.chrome.com/docs/devtools?hl=fr), [AllureReport](https://webdriver.io/docs/allure-reporter/), le tout écrit en [TypeScript](https://www.typescriptlang.org/).

## Pour commencer

Ce projet est basé sur [NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs). Son installation est requise pour une utilisation en local.

Installer les dépendances applicatives:

```shell
npm install
```

## Structure du projet

Les fichiers de configuration résident dans le dossier `config`. [Le modèle d'objet de page](https://martinfowler.com/bliki/PageObject.html) est utilisé pour organiser le code. Chaque page est définie dans le dossier `src/pages`. Les scénarios [BDD](https://martinfowler.com/bliki/GivenWhenThen.html) sous [cucumber](https://cucumber.io/docs/installation/javascript/) sont situés dans le dossier  `test/features` et les étapes d'exécution, dans le dossier `test/steps`. `allure-report` contient les rapports HTML généré et on y retrouve dans le dossier `comparaison-images`, les images de page et leurs différences comme résultat d'exécution des tests visuels.

## Exécution des tests

L'on peut exécuter les tests, soit en local ou sur une plateforme infonuagique de tests.

L'exécution locale est effectuée suivant la commande ci-après:

```shell
run-e2e.sh -t '@visuel or @perfo or @affaire or @a11y'
```

La commande suivante, permet d'exécuter les essais dans le nuage:

```shell
run-e2e.sh -t '@visuel or @perfo or @affaire or @a11y' -d oui
```
où 

`-t` : représente les étiquettes de type de tests possibles
`-d` : l'exécution à distance sur une plateforme (ce commutateur peut ne pas être défini ou prendre l'une des valeurs : oui/O/o ou Yes/Y/y)

La plateforme d'exécution de tests utilisée est [LambdaTest](https://www.lambdatest.com/).

L'on aura donc besoin d'un compte `Lambdatest` et définir les variables d'environnement `LT_USERNAME`, `LT_ACCESS_KEY` pour exécuter les tests sur cette plateforme.


## GitHub Actions

[GitHub Actions](https://docs.github.com/en/actions) est utilisé pour l'intégration et le déploiement continu, à cet effet, le fichier `github-actions-ci` est présent dans le dossier `workflows` situé à la racine du projet.
