export interface CnNumOptions {
	traditional: boolean
	capital: boolean
	liang: number
}
export declare enum UseLiang {
	No = 0,
	Bai = 4,
	Qian = 8,
	Wan = 16,
	Yi = 256,
	QianWanYi = 280,
	BaiQianWanYi = 284
}
export declare const DigitCN: Map<number, string>
export declare const DigitTraditionalCN: Map<number, string>
export declare const DigitCapitalCN: Map<number, string>
export declare const DigitCapitalTraditionalCN: Map<number, string>
export declare const SerialDigitCN: Map<number, string>
export declare function notNegToDigits(n: number): number[]
export declare function intToDigits(n: number): {
	neg: boolean
	digits: number[]
}
export declare function newCnNumConvertor(opt?: Partial<CnNumOptions> & {
	absLessThan?: number
}): (n: number) => string
export declare function newCnSerialNumConvertor(opt?: Partial<CnNumOptions>): (n: number) => string

export { }
