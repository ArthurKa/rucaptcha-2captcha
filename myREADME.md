<header>

Helps you to operate with [RuCaptcha] or [2Captcha] services conveniently.

Full documentation you can find on official sites: [RuCaptcha][RuCaptchaAPI], [2Captcha][2CaptchaAPI].

<installation>

## Usage
### Initialization
#### Synopsis

new RuCaptcha2Captcha(apiKey[, type]) → `captchaSolver` object

| Parameter | Type   | Required | Description
|-----------|--------|----------|-
| apiKey    | string | true     | Your account API key from settings ([RuCaptcha][RuCaptchaSettings] \| [2Captcha][2CaptchaSettings])
| type      | string | false    | Case insensitive **'2captcha'** for [2Captcha].<br>Any other for [RuCaptcha].

#### Example
```js
const RuCaptcha2Captcha = require('.');

const captchaSolver = new RuCaptcha2Captcha(<YOUR_API_KEY>);

// or for operating with 2Captcha.com
const captchaSolver = new RuCaptcha2Captcha(<YOUR_API_KEY>, '2captcha');

```

### captchaSolver.send method
#### Synopsis

captchaSolver.send(params) → `Promise<captcha_id>`

| Parameter | Type   | Required | Description
|-----------|--------|----------|-
| params    | object | true     | Object with params from documentation ([RuCaptcha][RuCaptchaParams] \| [2Captcha][2CaptchaParams]).<br>Except: `key`, `json` and `soft_id`.

Use this method to send captcha for solve.

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

| Parameter | Type   | Required | Description
|-----------|--------|----------|-
| filePath  | string | true     | Path to captcha image on your file system
| params    | object | false    | Object with params from documentation ([RuCaptcha][RuCaptchaParams] \| [2Captcha][2CaptchaParams]).<br>Except: `method`, `file`, `body`, `key`, `json` and `soft_id`.

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

| Parameter | Type      | Required   | Description
|-----------|-----------|------------|-
| id        | string    | one of all | Id of sent captcha, which you get from send-method
| ids       | Array<id> | one of all | Array of captcha ids
| strIds    | string    | one of all | String of comma separated captcha ids

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

| Parameter | Type   | Required | Description
|-----------|--------|----------|-
| id        | string | true     | Id of sent captcha, which you get from send-method

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

| Parameter | Type   | Required | Description
|-----------|--------|----------|-
| id        | string | true     | Id of sent captcha, which you get from send-method

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

More info you can find in documentation ([RuCaptcha][RuCaptchaAPI] | [2Captcha][2CaptchaAPI]).

<noTesting>

<suggestions>

[RuCaptcha]: https://rucaptcha.com
[2Captcha]: https://2captcha.com
[RuCaptchaAPI]: https://rucaptcha.com/api-rucaptcha
[2CaptchaAPI]: https://2captcha.com/2captcha-api
[RuCaptchaSettings]: https://rucaptcha.com/setting
[2CaptchaSettings]: https://2captcha.com/setting
[RuCaptchaParams]: https://rucaptcha.com/api-rucaptcha#normal_post
[2CaptchaParams]: https://2captcha.com/2captcha-api#normal_post
