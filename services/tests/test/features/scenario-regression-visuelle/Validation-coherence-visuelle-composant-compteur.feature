@visuel
Feature: Validation de la cohérence visuelle du composant du compteur

  Scenario: Validation de la regression visuel de la page compteur
    Given Je me rend sur la fonction du compteur
    When J'observe la page
    Then Le visuel de page de compteur n'a pas changé

  Scenario: Validation de la regression visuel suivant l'utilisation du compteur
    Given Je me rend sur la fonction du compteur
    When Je declenche le compteur
    When J'observe le composant compteur
    Then Le visuel du compteur n'a pas changé
