# cn-number

[English](README.md) | 中文

将整数或序列号转换为汉字数字。支持`大写`和`繁体`形式。

## 安装

```bash
npm i cn-number
```

## 使用方法

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

## 配置选项

`newCnNumConvertor` 用于创建一个将整数转换为汉字数字的函数。默认配置为：

```javascript
{ capital: false, traditional: false, liang: UseLiang.QianWanYi, absLessThan: Infinity }
```

`capital` 为 `true` 时，结果为大写形式，且结果中所有的 `2` 都不会变成 `两`。

`traditional` 为 `true` 时，结果为繁体形式。

`liang` 用于在 `二` 和 `两` 之间切换。默认值为 `UseLiang.QianWanYi`，即在 `千`、`万`、`亿` 前尝试使用 `两`。

`UseLiang` 包含 `Bai`、`Qian`、`Wan`、`Yi`、`QianWanYi`、`BaiQianWanYi`。并且：

```javascript
UseLiang.QianWanYi === UseLiang.Qian | UseLiang.Wan | UseLiang.Yi
UseLiang.BaiQianWanYi === UseLiang.Bai | UseLiang.Qian | UseLiang.Wan | UseLiang.Yi
```

如果您确定输入值的绝对值始终小于 `10000` 或 `1e8`，可以设置 `absLessThan` 来优化性能。否则无需设置。

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

`newCnSerialNumConvertor` 用于创建一个将序列号转换为汉字形式的函数。默认配置为：

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

## 字典

`DigitCN`、`DigitTraditionalCN`、`DigitCapitalCN`、`DigitCapitalTraditionalCN` 分别用于转换数字。

`SerialDigitCN` 用于转换序列号。

这五个字典可以直接导入使用，具体定义如下：

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

## 注意事项

在 JavaScript 中，绝对值等于或大于 2^53 的数值太大，无法准确表示为整数。因此，输入值应该大于 `-9007199254740992` 且小于 `9007199254740992`。
