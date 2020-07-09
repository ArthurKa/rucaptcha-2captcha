[![All dependencies](https://img.shields.io/librariesio/release/npm/rucaptcha-2captcha/1.0.4?style=flat-square "All dependencies of rucaptcha-2captcha@1.0.4")](https://libraries.io/npm/rucaptcha-2captcha/1.0.4)
[![Reported vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/rucaptcha-2captcha@1.0.4?style=flat-square "Reported vulnerabilities of rucaptcha-2captcha@1.0.4")](https://snyk.io/test/npm/rucaptcha-2captcha/1.0.4)
[![NPM-version](https://img.shields.io/badge/npm-v1.0.4-blue.svg?style=flat-square&&logo=npm "Current NPM-version")](https://www.npmjs.com/package/rucaptcha-2captcha/v/1.0.4)
[![Install size](https://flat.badgen.net/packagephobia/install/rucaptcha-2captcha@1.0.4?label=size 'Install size of rucaptcha-2captcha@1.0.4')](https://packagephobia.now.sh/result?p=rucaptcha-2captcha@1.0.4)
[![Total downloads](https://img.shields.io/npm/dt/rucaptcha-2captcha?style=flat-square "Total downloads for all the time")](https://npm-stat.com/charts.html?package=rucaptcha-2captcha)

# rucaptcha-2captcha@1.0.4

Helps you to operate with [RuCaptcha] or [2Captcha] services conveniently.

Full documentation you can find on official sites: [RuCaptcha Docs][RuCaptchaAPI], [2Captcha Docs][2CaptchaAPI].

## Installation
`rucaptcha-2captcha` is available via npm:
``` bash
$ npm i rucaptcha-2captcha@1.0.4
```

## Usage
### Initialization
#### Synopsis

new RuCaptcha2Captcha(apiKey[, type]) → `captchaSolver` object

| Name   | Type   | Required | Description
|--------|--------|----------|-
| apiKey | string | yes      | Your account API key from settings ([RuCaptcha][RuCaptchaSettings] \| [2Captcha][2CaptchaSettings]).
| type   | string | no       | Case insensitive **'2captcha'** for [2Captcha].<br>Any other for [RuCaptcha].

#### Example
```js
const RuCaptcha2Captcha = require('rucaptcha-2captcha');

const captchaSolver = new RuCaptcha2Captcha(<YOUR_API_KEY>);

// or for operating with 2Captcha.com
const captchaSolver = new RuCaptcha2Captcha(<YOUR_API_KEY>, '2captcha');

```

### captchaSolver.send method
#### Synopsis

captchaSolver.send(params) → `Promise<captcha_id>`

| Name   | Type   | Required | Description
|--------|--------|----------|-
| params | object | yes      | Object with properties from documentation ([RuCaptcha][RuCaptchaParams] \| [2Captcha][2CaptchaParams]).<br>Except: `key`, `json` and `soft_id`.

Use this method to send captcha for solving.

#### Example
```js
const id = await captchaSolver.send({
  method: 'base64',
  body: <base64_image_body>,
  // any other parameter from documentation
  // except: key, json and soft_id
});

// id: '4503599627'
```

### captchaSolver.sendFile custom method over captchaSolver.send
#### Synopsis

captchaSolver.sendFile(filePath[, params]) → `Promise<captcha_id>`

| Name     | Type   | Required | Description
|----------|--------|----------|-
| filePath | string | yes      | Path to captcha image on your file system.
| params   | object | no       | Object with properties from documentation ([RuCaptcha][RuCaptchaParams] \| [2Captcha][2CaptchaParams]).<br>Except: `method`, `file`, `body`, `key`, `json` and `soft_id`.

Use this method to send captcha as image from your local file system.

#### Example
```js
const id = await captchaSolver.sendFile('./captcha.jpg', {
  min_len: 6,
  max_len: 6,
  regsense: 1,
  numeric: 4,
  // any other parameter from documentation
  // except: method, file, body, key, json and soft_id
});

// id: '4503599627'
```

### captchaSolver.get method
#### Synopsis

captchaSolver.get(id | ids | strIds) → `Promise<captcha_token>` | `Promise<Array<captcha_token>>`

| Name   | Type      | Required   | Description
|--------|-----------|------------|-
| id     | string    | one of all | Id of sent captcha, which you get from send-method.
| ids    | Array<id> | one of all | Array of captcha ids.
| strIds | string    | one of all | String of comma-separated captcha ids.

Method for getting captcha solutions.\
Returns promise which resolves as soon as all captchas by provided ids will be solved on service.

#### Example
```js
  const token = await captchaSolver.get(id);
  // token: 'pgh3Ds'

  // or
  const tokens = await captchaSolver.get([id1, id2, ...]);
  // tokens: ['3kK3gS', 'q5ZZpt', ...]

  // or
  const tokens = await captchaSolver.get('<id1>,<id2>,...');
  // tokens: ['3kK3gS', 'q5ZZpt', ...]
```

### Solution reporting methods
#### Synopsis

captchaSolver.reportGood(id) → `Promise<Object>`\
captchaSolver.reportBad(id) → `Promise<Object>`

| Name | Type   | Required | Description
|------|--------|----------|-
| id   | string | yes      | Id of sent captcha, which you get from send-method.

Use these methods for reporting captcha results.

**Attention!** It's not necessary but better to send reports cause of refund of bad solutions and increasing solving accuracy by reporting good solutions.\
Returns some info that was sent from server.

#### Example
```js
  const result = await captchaSolver.reportGood(id);
  // or
  const result = await captchaSolver.reportBad(id);
  // result: { status: 1, request: 'OK_REPORT_RECORDED' }
```

### captchaSolver.get2 method
#### Synopsis

captchaSolver.get2(id) → `Promise<Object>`

| Name | Type   | Required | Description
|------|--------|----------|-
| id   | string | yes      | Id of sent captcha, which you get from send-method.

Use captchaSolver.get2 method for getting captcha answer with its cost price.

#### Example
```js
  const info = await captchaSolver.get2(id);
  // info: { request: '6p6pck', price: '0.034' }
```

### captchaSolver.getBalance method
#### Synopsis

captchaSolver.captchaSolver.getBalance() → `Promise<number>`

Use for getting your account balance.\
Note: don't use it too often because it decreases your API query limit.

#### Example
```js
  const balance = await captchaSolver.getBalance();
  // balance: 50.034
```

---

More info you can find in official documentation: [RuCaptcha Docs][RuCaptchaAPI], [2Captcha Docs][2CaptchaAPI].

## Testing
No testing functionality provided.

---

Your improve suggestions and bug reports are welcome any time.

[RuCaptcha]: https://rucaptcha.com
[2Captcha]: https://2captcha.com
[RuCaptchaAPI]: https://rucaptcha.com/api-rucaptcha
[2CaptchaAPI]: https://2captcha.com/2captcha-api
[RuCaptchaSettings]: https://rucaptcha.com/setting
[2CaptchaSettings]: https://2captcha.com/setting
[RuCaptchaParams]: https://rucaptcha.com/api-rucaptcha#normal_post
[2CaptchaParams]: https://2captcha.com/2captcha-api#normal_post
