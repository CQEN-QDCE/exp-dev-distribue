import { Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'
import { AxeBuilder } from '@axe-core/webdriverio';

Then(/^La page est complement accessible$/, async () => {
	const a11yViolations = JSON.stringify((await new AxeBuilder({ client: browser }).analyze()).violations);

	console.log('Violations des règles de l\'accessibilité:' + a11yViolations.toString())
	expect(a11yViolations).toEqual("")
});