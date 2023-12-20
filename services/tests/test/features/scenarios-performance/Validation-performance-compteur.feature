@perfo
Feature: Validation des performance du compteur

  Scenario: Validation des performances au chargement du compteur
    Given Je capture la performance de chargement via mon navigateur
    Then le score de performance est supérieur à ".99"
    And le temps d'affichage du premier contenu est inférieur à "1.8" seconde
    And le temps d'affichage contenu est inférieur à "2.5" secondes
    And l'indice de vitesse de l'affichage du conyenu est inférieur à "3.4" secondes
    And le temps de blocage total de la page est inférieur à "500" millisecondes
    And l'indice des mouvements inattendus du contenu de la page est inférieur à "0.1"

  Scenario: Validation des performances du compteur à l'utilisation
    Given Je capture la performance de chargement après le declenchement du compteur
    Then le score de performance est supérieur à ".99"
    And le temps d'affichage du premier contenu est inférieur à "1.8" seconde
    And le temps d'affichage contenu est inférieur à "2.5" secondes
    And l'indice de vitesse de l'affichage du conyenu est inférieur à "3.4" secondes
    And le temps de blocage total de la page est inférieur à "500" millisecondes
    And l'indice des mouvements inattendus du contenu de la page est inférieur à "0.1"
