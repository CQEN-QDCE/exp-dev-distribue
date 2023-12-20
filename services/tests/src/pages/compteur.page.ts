import { $ } from '@wdio/globals'
import Page from './page'
import { click } from '../../src/utils/commands';
require('dotenv').config();

class CompteurPage extends Page {
  pageUrl = process.env.APP_HOST;
  private get compteurBtn() { return $('//div//*[@class="counterBtn"]'); }
  private get compteurValue() { return $('//div//*[@class="counterValue"]'); }

  async compter() {
    await click(this.compteurBtn)
  }

  async obtenirValeurCompteur(): Promise<string> {
    return (await this.compteurValue).getText();
  }

  async ouvrir() {
    console.log('pageUrl:' + process.env.APP_HOST)
    await browser.maximizeWindow()
    return browser.url(this.pageUrl)
  }
}

export default new CompteurPage()