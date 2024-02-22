/**
 * Évènements personnalisés propagé et écouté par la plateforme coquille 
 * 
 * Ce fichier de définition peut être ajouté à un web component Typescript pour aider à la 
 * propagation d'évènements compatibles
 */

/** Évènement de navigation de la coquille. Déclenche une navigation si atteint window. */
interface NavigateEventDetail {
    /** Chemin relatif à l'url de base de la coquille à atteindre */
    path: string,
    /** Paramètres à passer à l'url demandé TODO À implémenter */
    query?: string
}


// ajouter aux 'WindowEventMap' de 'lib.dom.d.ts'
declare global {
    interface WindowEventMap {
        "navigate-custom-event":  CustomEvent<NavigateEventDetail> 
    }
}

export { NavigateEventDetail };