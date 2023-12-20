
export default class Page {

  async ouvrir(path: string) {
    await browser.maximizeWindow()
    return browser.url(`https://ng17-mfe1-dev.dev.cqen.ca/${path}`)
  }

  async titre(): Promise<string> {
    return await browser.getTitle()
  }
}