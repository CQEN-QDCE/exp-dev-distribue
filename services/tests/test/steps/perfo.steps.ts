
import { Given, Then } from '@wdio/cucumber-framework'
import { browser } from '@wdio/globals'
import CompteurPage from '../../src/pages/compteur.page';

Given(/^Je capture la performance de chargement via mon navigateur$/, async function () {
    await browser.enablePerformanceAudits()

    await CompteurPage.ouvrir()
    this.metrics = await browser.getMetrics()
    this.score = await browser.getPerformanceScore()

    await browser.disablePerformanceAudits()
});


Given(/^Je capture la performance de chargement après le declenchement du compteur$/, async function () {
    await CompteurPage.ouvrir()
    await browser.enablePerformanceAudits()

    await CompteurPage.compter()
    this.metrics = await browser.getMetrics()
    this.score = await browser.getPerformanceScore()

    await browser.disablePerformanceAudits()
});

Then(/^le score de performance est supérieur à "([^"]*)"$/, async function (valeurAttendue: number) {
    expect(await this.score.speedIndex >= valeurAttendue);
});

Then(/^le temps d'affichage du premier contenu est inférieur à "([^"]*)" seconde$/, async function (valeurAttendue: number) {
    expect(await this.metrics.firstContentfulPaint < valeurAttendue * 1000);
});

Then(/^le temps d'affichage contenu est inférieur à "([^"]*)" secondes$/, async function (valeurAttendue: number) {
    expect(await this.metrics.largestContentfulPaint < valeurAttendue * 1000);
});

Then(/^l'indice de vitesse de l'affichage du conyenu est inférieur à "([^"]*)" secondes$/, async function (valeurAttendue: number) {
    expect(await this.metrics < valeurAttendue * 1000);
});

Then(/^l'indice des mouvements inattendus du contenu de la page est inférieur à "([^"]*)"$/, async function (valeurAttendue: number) {
    expect(await this.metrics.totalBlockingTime < valeurAttendue * 1000);
});

Then(/^le temps de blocage total de la page est inférieur à "([^"]*)" millisecondes$/, async function (valeurAttendue: number) {
    expect(await this.metrics.totalBlockingTime < valeurAttendue * 1000);
});