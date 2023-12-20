
import { When, Then } from '@wdio/cucumber-framework'
import { browser } from '@wdio/globals'

When("J'observe la page", async () => {
    await browser.pause(2000);
    await browser.saveFullPageScreen('page-compteur', {});
});

When("J'observe le composant compteur", async () => {
    await browser.pause(2000);
    await browser.saveFullPageScreen('composant-compteur', {});
});

When("Je capture la tabulation de la page", async () => {
    await browser.pause(2000);
    await browser.saveFullPageScreen('page-tabulation', {});
});

Then("Le visuel du compteur n'a pas changé", async () => {
    expect(await browser.checkFullPageScreen('composant-compteur', {})).toEqual(0);
});

Then("Le visuel de page de compteur n'a pas changé", async () => {
    expect(await browser.checkFullPageScreen('page-compteur', {})).toEqual(0);
});

Then("La tabulation de la page n'a pas changé", async () => {
    expect(await browser.checkFullPageScreen('page-tabulation', {})).toEqual(0);
});