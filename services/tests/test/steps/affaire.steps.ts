import { Given, When, Then } from '@wdio/cucumber-framework';
import CompteurPage from '../../src/pages/compteur.page';
import { expect } from '@wdio/globals'

Given(/^Je me rend sur la fonction du compteur$/, async () => {
	await CompteurPage.ouvrir();
});

When(/^Je declenche le compteur$/, async () => {
	await CompteurPage.compter();
});

Then(/^Le compteur affiche "([^"]*)"$/, async (valeurAttendue: string) => {
	await expect(await CompteurPage.obtenirValeurCompteur()).toEqual(valeurAttendue);
});

Then(/^Le titre de la page est "([^"]*)"$/, async (valeurAttendue: string) => {
	await expect(await CompteurPage.titre()).toEqual(valeurAttendue);
});