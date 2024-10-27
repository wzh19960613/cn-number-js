import {
    DigitCapitalCN, DigitCapitalTraditionalCN, DigitTraditionalCN, DigitCN, SerialDigitCN
} from './dicts'

export interface CnNumOptFinal {
    dict: Map<number, string>
    liang: number
}

export interface CnNumOptions {
    traditional: boolean
    capital: boolean
    liang: number
}

export enum UseLiang {
    No = 0,
    Bai = 0b100,
    Qian = 0b1000,
    Wan = 0b10000,
    Yi = 0b100000000,
    QianWanYi = 0b100011000,
    BaiQianWanYi = 0b100011100,
}

const defaultCnNumOptions: CnNumOptions = {
    traditional: false,
    capital: false,
    liang: UseLiang.QianWanYi
}

export function getOpt(opt?: Partial<CnNumOptions>): CnNumOptFinal {
    const capital = opt?.capital ?? defaultCnNumOptions.capital
    const dict = opt?.traditional ?? defaultCnNumOptions.traditional
        ? capital ? DigitCapitalTraditionalCN : DigitTraditionalCN
        : capital ? DigitCapitalCN : DigitCN
    return { dict, liang: opt?.liang ?? defaultCnNumOptions.liang }
}

export function getSerialDict(opt?: { traditional?: boolean, capital?: boolean }) {
    const capital = opt?.capital ?? defaultCnNumOptions.capital
    return opt?.traditional ?? defaultCnNumOptions.traditional
        ? capital ? DigitCapitalTraditionalCN : DigitTraditionalCN
        : capital ? DigitCapitalCN : SerialDigitCN
}