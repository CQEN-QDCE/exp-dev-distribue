import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mea-app-formulaire',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire.component.html'
})
export class FormulaireComponent {
    constructor(
        private router:Router
    ){}

    exempleForm = new FormGroup({});

    onSubmit() { 
        this.router.navigate(['/confirmation'], {skipLocationChange: true});
    }
}
