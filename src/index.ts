import type { CnNumOptFinal, CnNumOptions } from './config'
import { UseLiang, getOpt, getSerialDict } from './config'
export type { CnNumOptions }
export { UseLiang }
export * from './dicts'

type Dict = Map<number, string>

export function notNegToDigits(n: number) {
    const digits: number[] = []
    for (let i = n; i; i = Math.floor(i / 10)) digits.push(i % 10)
    return digits
}

export function intToDigits(n: number) {
    if (!Number.isInteger(n)) throw new TypeError('`n` must be an integer')
    if (!n) return { neg: false, digits: [0] }
    const neg = n < 0
    return { neg, digits: notNegToDigits(neg ? -n : n) }
}

function bai(parts: string[], d: number, dict: Dict, liang: number) {
    parts.push(dict.get(d === 2 ? (liang & UseLiang.Bai ? -2 : 2) : d)!, dict.get(100)!)
}

function qian(parts: string[], d: number, dict: Dict, liang: number) {
    parts.push(dict.get(d === 2 ? (liang & UseLiang.Qian ? -2 : 2) : d)!, dict.get(1000)!)
}

function wan(parts: string[], d: number, dict: Dict, liang: number) {
    parts.push(dict.get(d === 2 ? (liang & UseLiang.Wan ? -2 : 2) : d)!)
}

function yi(parts: string[], d: number, dict: Dict, liang: number) {
    parts.push(dict.get(d === 2 ? (liang & UseLiang.Yi ? -2 : 2) : d)!, dict.get(1e8)!)
}

function fourDigit(parts: string[], digits: number[], dict: Dict, liang: number) {
    const len = digits.length
    if (len === 1) parts.push(dict.get(digits[0])!)
    else if (len === 2) {
        const [d1, d10] = digits
        if (d10 !== 1) parts.push(dict.get(d10)!)
        parts.push(dict.get(10)!)
        d1 && parts.push(dict.get(digits[0])!)
    } else if (len === 3) {
        const [d1, d10, d100] = digits
        bai(parts, d100, dict, liang)
        if (d10) {
            parts.push(dict.get(d10)!, dict.get(10)!)
            d1 && parts.push(dict.get(d1)!)
        } else d1 && parts.push(dict.get(0)!, dict.get(d1)!)
    } else {
        const [d1, d10, d100, d1000] = digits
        qian(parts, d1000, dict, liang)
        if (d100) {
            bai(parts, d100, dict, liang)
            if (d10) {
                parts.push(dict.get(d10)!, dict.get(10)!)
                d1 && parts.push(dict.get(d1)!)
            } else d1 && parts.push(dict.get(0)!, dict.get(d1)!)
        } else if (d10) {
            parts.push(dict.get(0)!, dict.get(d10)!, dict.get(10)!)
            d1 && parts.push(dict.get(d1)!)
        } else d1 && parts.push(dict.get(0)!, dict.get(d1)!)
    }
}

function cnNum4Digit(n: number, opt: CnNumOptFinal) {
    const { dict, liang } = opt
    const { neg, digits } = intToDigits(n)
    const parts = neg ? [dict.get(-1)!] : []
    fourDigit(parts, digits, dict, liang)
    return parts.join('')
}

function cnNum8Digit(n: number, opt: CnNumOptFinal) {
    const neg = n < 0
    const v = neg ? -n : n
    const nWan = Math.floor(v / 1e4)
    if (!nWan) return cnNum4Digit(n, opt)
    const { dict, liang } = opt
    const parts = neg ? [dict.get(-1)!] : []
    nWan === 2
        ? wan(parts, nWan, dict, liang)
        : fourDigit(parts, notNegToDigits(nWan), dict, liang)
    parts.push(dict.get(1e4)!)
    const nRemain = v % 1e4
    if (nRemain) {
        nRemain < 1000
            ? nRemain > 9 && nRemain < 20
                ? parts.push(dict.get(0)!, dict.get(1)!)
                : parts.push(dict.get(0)!)
            : nWan % 100 || parts.push(dict.get(0)!)
        fourDigit(parts, notNegToDigits(nRemain), dict, liang)
    }
    return parts.join('')
}

function cnNum(n: number, opt: CnNumOptFinal) {
    const neg = n < 0
    const v = neg ? -n : n
    const nYi = Math.floor(v / 1e8)
    if (!nYi) return cnNum8Digit(n, opt)
    const { dict } = opt
    const parts = neg ? [dict.get(-1)!] : []
    nYi === 2
        ? yi(parts, nYi, dict, opt.liang)
        : parts.push(cnNum8Digit(nYi, opt), dict.get(1e8)!)
    const nRemain = v % 1e8
    if (nRemain) nRemain < 1e7
        ? nRemain > 9 && nRemain < 20
            ? parts.push(dict.get(0)!, dict.get(1)!, cnNum4Digit(nRemain, opt))
            : parts.push(dict.get(0)!, cnNum8Digit(nRemain, opt))
        : nYi % 100
            ? parts.push(cnNum8Digit(nRemain, opt))
            : parts.push(dict.get(0)!, cnNum8Digit(nRemain, opt))
    return parts.join('')
}

export function newCnNumConvertor(opt?: Partial<CnNumOptions> & { absLessThan?: number }) {
    const absLessThan = opt?.absLessThan ?? Infinity
    const _opt = getOpt(opt)
    if (absLessThan > 1e8) return function (n: number) { return cnNum(n, _opt) }
    return absLessThan > 1e4
        ? function (n: number) { return cnNum8Digit(n, _opt) }
        : function (n: number) { return cnNum4Digit(n, _opt) }
}

export function newCnSerialNumConvertor(opt?: Partial<CnNumOptions>) {
    const dict = getSerialDict(opt)
    return function (n: number) { return notNegToDigits(n).reverse().map(d => dict.get(d)!).join('') }
}