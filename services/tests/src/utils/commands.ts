import report from '@wdio/allure-reporter'


export const addLog = (log: string) => {
    report.addStep(`STEP: ${log}`)
    console.log(`STEP: ${log}`)
}

export const setText = async (element: Promise<WebdriverIO.Element>, text: string) => {
    await (await element).setValue(text);
    addLog(`Entered value: ${text}`)
}

export const selectVisibleText = async (element: Promise<WebdriverIO.Element>, text: string) => {
    await (await element).selectByVisibleText(text);
    addLog(`Selected by visible text: ${text}`)
}

export const click = async (element: Promise<WebdriverIO.Element>) => {
    await (await element).click()
    addLog(`Clicked on element: ${(await element).selector}`)
}