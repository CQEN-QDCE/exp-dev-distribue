/**
 * Intégrer ce composant dans l'index.html de l'application pour observer les mutations du DOM.
 *
 * Puisque ce composant taxe les performance du fureteur, il doit être utilisé uniquement pour le développement et le diagnostic.
 */
export class DomObserver extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    observer: MutationObserver | undefined;

    connectedCallback() {
        this.observer = new MutationObserver(this.mutationObserverCallback);
        this.observer.observe(this.parentNode || document, this.mutationObserverOptions);
    }

    mutationObserverOptions: MutationObserverInit = {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
      };

      mutationObserverCallback: MutationCallback = (mutations) => {
        mutations.forEach(function(mutation) {
            const element = mutation.target as HTMLElement;
            const style = getComputedStyle(element);
            console.info(`nodeName: ${element.nodeName}, id: ${element.id}, computed style.position: ${style.position}, mutation.type: ${mutation.type}, child node count: ${mutation.addedNodes.length}`);
        });
    }
}

customElements.define('dom-observer', DomObserver);