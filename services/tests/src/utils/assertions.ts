import { addLog } from "./commands"

export const toContain = (actual: string | Promise<WebdriverIO.Element>, expected: string) => {
    expect(actual).toContain(expected)
    addLog(`Assertion >> ${actual} to contain ${expected}`)
}
export const toEqual = (actual: string, expected: string) => {
    expect(actual).toEqual(expected)
    addLog(`Assertion >> ${actual} to equal ${expected}`)
}