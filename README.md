# JS-cryptp

​	本项目为gm-crypto项目的拓展，实现了sm4的纯浏览器的ECB，CBC，CTR的加解密。加解密保证了与GMSSL项目中的标准SM4加解密一致。同时实现了浏览器端的文件加解密测试。

> GMSSL项目地址：https://github.com/guanzhi/GmSSL

## 与gm-crypto的差异修改

​	项目修改了web包的构建方法采用webpack的方式打包。具体打包配置修改参考webpack.config.js和package.json。本项目同时也提供了填充方法自定义的方式，代码已经被注释。

​	项目的ctr实现逻辑详细请查看“src/lib/smr.js”

## 启动和浏览器测试

你需要按照以下步骤准备打包测试环境

### 构建前端使用的js包

```shell
// 按照项目环境依赖
npm install
// 生成browser可用的js包（生成dist下的gmCrypto.js）
npm run build
```

### 运行前端测试

> - 项目提供ECB，CBC， CTR三种模式的加解密测试，你只需要更改MODEL的值(ECB:1 CBC:2 CTR:3)
> - 项目的加解密文件是一次性载入内存的逻辑，测试时推荐文件大小不要超过1M。 你可以自行修改文件的读取逻辑。

#### 	加密：

​	用浏览器（推荐Chrome浏览器）打开browser_test下的browsers_sm4.html文件选择data文件夹下的123.txt文件点击加密文件即可。

#### 	解密：

​	将加密后的文件下载保存，选择加密后的文件点击解密即可。

## 注意：

- 如果你想测试源项目的test请将package.json的内容换为package_old.json

  源项目链接:https://www.npmjs.com/package/gm-crypto

  git仓库:https://github.com/byte-fe/gm-crypto



------



# 源项目README:

# gm-crypto

[![Build Status](https://github.com/byte-fe/gm-crypto/actions/workflows/codecov.yml/badge.svg)](https://github.com/byte-fe/gm-crypto/actions/workflows/codecov.yml)
[![codecov](https://codecov.io/gh/byte-fe/gm-crypto/branch/main/graph/badge.svg?token=5UbUw8VKYh)](https://codecov.io/gh/byte-fe/gm-crypto)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](pulls)

![密码行业标准化委员会](./spec_header.png)

A pure JavaScript implementation of GM/T series(sm2,sm3,sm4) cryptographic algorithms compatible with Node.js and browsers, with type declaration files support.

- [GM/T0003-2012《SM2 public key cryptographic algorithm based on elliptic curves》](http://www.oscca.gov.cn/sca/xxgk/2010-12/17/content_1002386.shtml)
- [GM/T0004-2012《SM3 cryptographic hash algorithm》](https://www.oscca.gov.cn/sca/xxgk/2010-12/17/content_1002389.shtml)
- [GM/T0002-2012《SM4 block cipher algorithm》(also aliased as SMS4)](http://www.sca.gov.cn/sca/c100061/201611/1002423/files/330480f731f64e1ea75138211ea0dc27.pdf)

## Quick Start

### Install

Using npm:

```bash
$ npm install gm-crypto
```

Using yarn:

```bash
$ yarn add gm-crypto
```

### Basic Usage

#### SM2

> Public Key Cryptographic Algorithm Based on Elliptic Curves.

```js
const { SM2 } = require('gm-crypto')

const { publicKey, privateKey } = SM2.generateKeyPair()
const originalData = 'SM2 椭圆曲线公钥密码算法'

const encryptedData = SM2.encrypt(originalData, publicKey, {
  inputEncoding: 'utf8',
  outputEncoding: 'base64'
})

const decryptedData = SM2.decrypt(encryptedData, privateKey, {
  inputEncoding: 'base64',
  outputEncoding: 'utf8'
})
```

#### SM3

> Cryptographic Hash Algorithm.

```js
const { SM3 } = require('gm-crypto')

console.log(SM3.digest('abc'))
console.log(SM3.digest('YWJj', 'base64'))
console.log(SM3.digest('616263', 'hex', 'base64'))
```

#### SM4

> Block Cipher Algorithm.

```js
const { SM4 } = require('gm-crypto')

const key = '0123456789abcdeffedcba9876543210' // Any string of 32 hexadecimal digits
const originalData = 'SM4 国标对称加密'

/**
 * Block cipher modes:
 * - ECB: electronic codebook
 * - CBC: cipher block chaining
 */

let encryptedData, decryptedData

// ECB
encryptedData = SM4.encrypt(originalData, key, {
  inputEncoding: 'utf8',
  outputEncoding: 'base64'
})
decryptedData = SM4.decrypt(encryptedData, key, {
  inputEncoding: 'base64',
  outputEncoding: 'utf8'
})

// CBC
const iv = '0123456789abcdeffedcba9876543210' // Initialization vector(any string of 32 hexadecimal digits)
encryptedData = SM4.encrypt(originalData, key, {
  iv: iv,
  mode: SM4.constants.CBC,
  inputEncoding: 'utf8',
  outputEncoding: 'hex'
})
decryptedData = SM4.decrypt(encryptedData, key, {
  iv: iv,
  mode: SM4.constants.CBC,
  inputEncoding: 'hex',
  outputEncoding: 'utf8'
})
```

## API

- [SM2](#api)

  - [.generateKeyPair()](#sm2generatekeypair) ⇒ `object`
  - [.encrypt(data, key[, options]](#sm2encryptdata-key-options) ⇒ `string` | `ArrayBuffer`
  - [.decrypt(data, key[, options])](#sm2decryptdata-key-options) ⇒ `string` | `ArrayBuffer`

- [SM3](#api)

  - [.digest(data[, inputEncoding][, outputEncoding])](#sm3digestdata-inputencoding-outputencoding) ⇒ `string` | `ArrayBuffer`

- [SM4](#api)
  - [.encrypt(data, key[, options])](#sm4encryptdata-key-options) ⇒ `string` | `ArrayBuffer`
  - [.decrypt(data, key[, options])](#sm4decryptdata-key-options) ⇒ `string` | `ArrayBuffer`

### SM2.generateKeyPair()

Generates a new asymmetric key pair.

### SM2.encrypt(data, key[, options])

Encrypt data.

| Param                  | Type                              | Default  | Description                                                                                                                                                                                      |
| ---------------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data                   | `string`\|`ArrayBuffer`\|`Buffer` |          | Plain message                                                                                                                                                                                    |
| key                    | `string`                          |          | Public key generated by [SM2.generateKeyPair()](#sm2generatekeypair)                                                                                                                             |
| options                | `object`                          |          | Options                                                                                                                                                                                          |
| options.mode           | `C1C3C2` \| `C1C2C3`              | `C1C3C2` | Concatenation mode                                                                                                                                                                               |
| options.inputEncoding  | `string`                          | `"utf8"` | The encoding of the plain `data` string,if `data` is not a string then `inputEncoding` is ignored.                                                                                               |
| options.outputEncoding | `string`                          |          | If `outputEncoding` is provided, a string will be returned, otherwise a [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) is returned. |
| options.pc             | `boolean`                         | `false`  | Includes `PC` mark as first byte                                                                                                                                                                 |

### SM2.decrypt(data, key[, options])

Decrypt data.

| Param                  | Type                              | Default  | Description                                                                                                                                                                                      |
| ---------------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data                   | `string`\|`ArrayBuffer`\|`Buffer` |          | Ciphered data                                                                                                                                                                                    |
| key                    | `string`                          |          | Private key generated by [SM2.generateKeyPair()](#sm2generatekeypair)                                                                                                                            |
| options.mode           | `C1C3C2` \| `C1C2C3`              | `C1C3C2` | Concatenation mode                                                                                                                                                                               |
| options.inputEncoding  | `string`                          |          | The encoding of the plain `data` string,if `data` is not a string then `inputEncoding` is ignored.                                                                                               |
| options.outputEncoding | `string`                          |          | If `outputEncoding` is provided, a string will be returned, otherwise a [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) is returned. |
| options.pc             | `boolean`                         | `false`  | Includes `PC` mark as first byte                                                                                                                                                                 |

### SM3.digest(data, [inputEncoding], [outputEncoding])

Calculates the digest.

| Param          | Type                              | Default  | Description                                                                                                                                                                                      |
| -------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data           | `string`\|`ArrayBuffer`\|`Buffer` |          | Data message                                                                                                                                                                                     |
| inputEncoding  | `string`                          | `"utf8"` | The encoding of the `data` string, if `data` is not a string then `inputEncoding` is ignored.                                                                                                    |
| outputEncoding | `string`                          |          | If `outputEncoding` is provided, a string will be returned, otherwise a [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) is returned. |

### SM4.encrypt(data, key[, options])

Encrypt data.

| Param                  | Type                              | Default  | Description                                                                                                                                                                                      |
| ---------------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data                   | `string`\|`ArrayBuffer`\|`Buffer` |          | Plain message                                                                                                                                                                                    |
| key                    | `string`                          |          | Cipher key(any string of 32 hexadecimal digits)                                                                                                                                                  |
| options                | `object`                          |          | Options                                                                                                                                                                                          |
| options.mode           | `ECB` \| `CBC`                    | `ECB`    | Block cipher mode                                                                                                                                                                                |
| options.iv             | `string`                          |          | Initialization vector(any string of 32 hexadecimal digits)                                                                                                                                       |
| options.inputEncoding  | `string`                          | `"utf8"` | The encoding of the plain `data` string,if `data` is not a string then `inputEncoding` is ignored.                                                                                               |
| options.outputEncoding | `string`                          |          | If `outputEncoding` is provided, a string will be returned, otherwise a [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) is returned. |

### SM4.decrypt(data, key[, options])

Decrypt data.

| Param                  | Type                              | Default | Description                                                                                                                                                                                      |
| ---------------------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data                   | `string`\|`ArrayBuffer`\|`Buffer` |         | Ciphered data                                                                                                                                                                                    |
| key                    | `string`                          |         | Cipher key(any string of 32 hexadecimal digits)                                                                                                                                                  |
| options                | `object`                          |         | Options                                                                                                                                                                                          |
| options.mode           | `ECB` \| `CBC`                    | `ECB`   | Block cipher mode                                                                                                                                                                                |
| options.iv             | `string`                          |         | Initialization vector(any string of 32 hexadecimal digits)                                                                                                                                       |
| options.inputEncoding  | `string`                          |         | The encoding of the plain `data` string,if `data` is not a string then `inputEncoding` is ignored.                                                                                               |
| options.outputEncoding | `string`                          |         | If `outputEncoding` is provided, a string will be returned, otherwise a [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) is returned. |
