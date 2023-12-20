@visuel
Feature: Validation de la navigation tabulaire du composant du compteur

  Scenario: Validation de la tabulation du compteur
    Given Je me rend sur la fonction du compteur
    When Je capture la tabulation de la page
    Then La tabulation de la page n'a pas changé
