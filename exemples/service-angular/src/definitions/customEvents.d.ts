/**
 * Évènements personnalisés propagé et écouté par la plateforme coquille 
 * 
 * Ce fichier de définition a été importer du code de la coquille pour intégrer les évènements personnalisé
 * de la coquille.
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