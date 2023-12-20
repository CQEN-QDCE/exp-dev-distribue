import { Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'
import { AxeBuilder } from '@axe-core/webdriverio';

Then(/^La page est complement accessible$/, async () => {
	expect((await new AxeBuilder({ client: browser }).analyze()).violations).toEqual("")
});