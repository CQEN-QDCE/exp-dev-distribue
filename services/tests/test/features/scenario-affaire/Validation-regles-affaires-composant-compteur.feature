@affaire
Feature: Validation des règles affaire du composant du compteur

  Scenario: Validation de la regression visuel de la page compteur
    Given Je me rend sur la fonction du compteur
    Then Le compteur affiche "0"

  Scenario: Validation de la regression visuel suivant l'utilisation du compteur
    Given Je me rend sur la fonction du compteur
    When Je declenche le compteur
    Then Le compteur affiche "1"

  Scenario: Validation du titre de la page du compteur
    Given Je me rend sur la fonction du compteur
    Then Le titre de la page est "Mfe1"
