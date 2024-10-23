# cn-number

Convert integers or serial numbers to Chinese words. Support `capital` and `traditional`.

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

## Options

Default option for `newCnNumConvertor` is:

```javascript
{ capital: false, traditional: false, liang: UseLiang.QianWanYi, absLessThan: Infinity }
```

`liang` is for switching between `二` and `两`. Default value is `UseLiang.QianWanYi`.

When `{ capital: true }` there will be no `两` in result.

`UseLiang` contains `Bai`, `Qian`, `Wan`, `Yi`, `QianWanYi`, `BaiQianWanYi`. And

```javascript
UseLiang.QianWanYi === UseLiang.Qian | UseLiang.Wan | UseLiang.Yi
UseLiang.BaiQianWanYi === UseLiang.Bai | UseLiang.Qian | UseLiang.Wan | UseLiang.Yi
```

If you can make sure the abs of inputed value will always less than `10000` or `1e8`,
you can set the `absLessThan` to optimize performance. Otherwise there's no need to set it.

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

Default option for `newCnSerialNumConvertor` is:

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

## Attention

In JavaScript, numeric literals with absolute values equal to 2^53 or greater are too large to be represented accurately as integers. So the value input should be greater than `-9007199254740992` and less than `9007199254740992`.