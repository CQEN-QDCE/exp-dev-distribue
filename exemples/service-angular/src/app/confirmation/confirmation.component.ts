import { Component, EventEmitter, Output, ElementRef } from '@angular/core';

import { NavigateEventDetail } from '../../definitions/customEvents';



@Component({
  selector: 'mea-app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {
 
    private nativeElement: HTMLElement;    
    constructor(element: ElementRef)
    {
        this.nativeElement = element.nativeElement;
    }
    
    onBtnQuitterClick() {

        let eventQuitter = new CustomEvent<NavigateEventDetail>("navigate-custom-event", {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
                path: ""
            } 
        });

        this.nativeElement.dispatchEvent(eventQuitter);
    }
}