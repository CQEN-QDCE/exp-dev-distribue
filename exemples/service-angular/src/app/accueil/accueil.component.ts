import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mea-app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html'
})
export class AccueilComponent {
    constructor(
        private router:Router
    ){}  
  
    onClick() {
        this.router.navigate(['/formulaire'], {skipLocationChange: true});
    }
}
