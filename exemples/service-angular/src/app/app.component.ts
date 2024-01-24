import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'mea-app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: [
    './quebec_ca.css'
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent {
  constructor(private router: Router) { }  

    ngOnInit(): void {
      // Important : Ceci provoque la résolution des routes dans le contexte d'un web component
      this.router.initialNavigation();
    }
    title = 'service-angular';
}
