# cn-number

English | [中文](README_CN.md)

Convert integers or serial numbers to Chinese numerals. Supports `capital` and `traditional` forms.

## Installation

```bash
npm i cn-number
```

## Usage

```javascript
import { newCnNumConvertor, newCnSerialNumConvertor } from "cn-number"

const jsMax = 9007199254740991

const cn = newCnNumConvertor()
// 九千零七万一千九百九十二亿五千四百七十四万零九百九十一
console.log(cn(jsMax))
// 负九千零七万一千九百九十二亿五千四百七十四万零九百九十一
console.log(cn(-jsMax))

const cns = newCnSerialNumConvertor()
// 九〇〇七一九九二五四七四〇九九一
console.log(cns(jsMax))
```

## Configuration Options

`newCnNumConvertor` creates a function that converts integers to Chinese numerals. Default configuration:

```javascript
{ capital: false, traditional: false, liang: UseLiang.QianWanYi, absLessThan: Infinity }
```

When `capital` is `true`, the result will be in capital form, and all `2` will not be converted to `两`.

When `traditional` is `true`, the result will be in traditional form.

`liang` is used to switch between `二` and `两`. The default value is `UseLiang.QianWanYi`, which means trying to use `两` before `千`, `万`, and `亿`.

`UseLiang` includes `Bai`, `Qian`, `Wan`, `Yi`, `QianWanYi`, `BaiQianWanYi`. And:

```javascript
UseLiang.QianWanYi === UseLiang.Qian | UseLiang.Wan | UseLiang.Yi
UseLiang.BaiQianWanYi === UseLiang.Bai | UseLiang.Qian | UseLiang.Wan | UseLiang.Yi
```

If you are certain that the absolute value of the input is always less than `10000` or `1e8`, you can set `absLessThan` to optimize performance. Otherwise, no need to set it.

```javascript
import { newCnNumConvertor, UseLiang } from "cn-number"

const cn = newCnNumConvertor()
// 一百二十三 负一百二十三
console.log(cn(123), cn(-123))

const cn_capital = newCnNumConvertor({ capital: true })
// 壹佰贰拾叁 负壹佰贰拾叁
console.log(cn_capital(123), cn_capital(-123))

const cn_traditional = newCnNumConvertor({ traditional: true })
// 一百二十三 負一百二十三
console.log(cn_traditional(123), cn_traditional(-123))

const cn_capital_traditional = newCnNumConvertor({ capital: true, traditional: true })
// 壹佰貳拾參 負壹佰貳拾參
console.log(cn_capital_traditional(123), cn_capital_traditional(-123))

const cn_LiangAtBai = newCnNumConvertor({ liang: UseLiang.BaiQianWanYi })
// 两百
console.log(cn_LiangAtBai(200))
```

`newCnSerialNumConvertor` creates a function that converts serial numbers to Chinese form. Default configuration:

```javascript
{ capital: false, traditional: false }
```

```javascript
import { newCnSerialNumConvertor } from "cn-number"

const cns = newCnSerialNumConvertor()
// 二〇二四
console.log(cns(2024))

const cns_capital = newCnSerialNumConvertor({ capital: true })
// 贰零贰肆
console.log(cns_capital(2024))

const cns_traditional = newCnSerialNumConvertor({ traditional: true })
// 二零二四
console.log(cns_traditional(2024))

const cns_capital_traditional = newCnSerialNumConvertor({ capital: true, traditional: true })
// 貳零貳肆
console.log(cns_capital_traditional(2024))
```

## Dictionaries

`DigitCN`, `DigitTraditionalCN`, `DigitCapitalCN`, `DigitCapitalTraditionalCN` are used for converting numbers.

`SerialDigitCN` is used for converting serial numbers.

These five dictionaries can be imported directly, defined as follows:

```javascript
const DigitCN = new Map([
    [-2, '两'], [-1, '负'],
    [0, '零'], [1, '一'], [2, '二'], [3, '三'], [4, '四'],
    [5, '五'], [6, '六'], [7, '七'], [8, '八'], [9, '九'],
    [10, '十'], [100, '百'], [1000, '千'], [1e4, '万'], [1e8, '亿']
])

const DigitTraditionalCN = new Map([
    [-2, '兩'], [-1, '負'],
    [0, '零'], [1, '一'], [2, '二'], [3, '三'], [4, '四'],
    [5, '五'], [6, '六'], [7, '七'], [8, '八'], [9, '九'],
    [10, '十'], [100, '百'], [1000, '千'], [1e4, '萬'], [1e8, '億']
])

const DigitCapitalCN = new Map([
    [-2, '贰'], [-1, '负'],
    [0, '零'], [1, '壹'], [2, '贰'], [3, '叁'], [4, '肆'],
    [5, '伍'], [6, '陆'], [7, '柒'], [8, '捌'], [9, '玖'],
    [10, '拾'], [100, '佰'], [1000, '仟'], [1e4, '万'], [1e8, '亿']
])

const DigitCapitalTraditionalCN = new Map([
    [-2, '貳'], [-1, '負'],
    [0, '零'], [1, '壹'], [2, '貳'], [3, '參'], [4, '肆'],
    [5, '伍'], [6, '陸'], [7, '柒'], [8, '捌'], [9, '玖'],
    [10, '拾'], [100, '佰'], [1000, '仟'], [1e4, '萬'], [1e8, '億']
])

const SerialDigitCN = new Map([
    [0, '〇'], [1, '一'], [2, '二'], [3, '三'], [4, '四'],
    [5, '五'], [6, '六'], [7, '七'], [8, '八'], [9, '九'],
])
```

## Attention

In JavaScript, numbers with absolute values equal to or greater than 2^53 are too large to be represented accurately as integers. Therefore, input values should be greater than `-9007199254740992` and less than `9007199254740992`.

