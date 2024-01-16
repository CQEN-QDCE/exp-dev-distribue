import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';



export const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'formulaire', component: FormulaireComponent },
    { path: 'confirmation', component: ConfirmationComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
