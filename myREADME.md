<header>

Helps you to operate with [RuCaptcha] or [2Captcha] services conveniently.

Full documentation you can find on official sites: [RuCaptcha Docs][RuCaptchaAPI], [2Captcha Docs][2CaptchaAPI].

<installation>

## Usage
### Initialization
#### Synopsis

new RuCaptcha2Captcha(apiKey[, type]) → `captchaSolver` object

| Name   | Type         | Required | Description
|--------|--------------|----------|-
| apiKey | string       | yes      | Your account API key from settings ([RuCaptcha][RuCaptchaSettings] \| [2Captcha][2CaptchaSettings]).
| type   | `2` \| `'2'` | no       | Provide string or number **2** for [2Captcha].<br>Any other for [RuCaptcha].

#### Example
```ts
import RuCaptcha2Captcha from './rucaptcha-2captcha/src';

const captchaSolver = new RuCaptcha2Captcha(<YOUR_API_KEY>);

// or for operating with 2Captcha.com
const captchaSolver = new RuCaptcha2Captcha(<YOUR_API_KEY>, 2);
```

### <captchaSolver.send method|#send>
#### Synopsis

captchaSolver.send(params) → `Promise<captcha_id>`

| Name   | Type   | Required | Description
|--------|--------|----------|-
| params | object | yes      | Object with properties from documentation ([RuCaptcha][RuCaptchaParams] \| [2Captcha][2CaptchaParams]),<br>except: `key`, `json` and `soft_id`.<br>Among these properties of `url`, `method`, `file` and `body`<br>can be used only the next combinations:<br>&nbsp;• single `url`<br>&nbsp;• `method` + `body`<br>&nbsp;• `method` + `file`

Use this method to send captcha for solving.

#### Example
```ts
const id = await captchaSolver.send({
  method: 'base64',
  body: <base64_image_body>,
  // any other parameter from documentation,
  // except: file, key, json and soft_id
});

// id: '4503599627'
```
#### Sending image from your local file system or the Internet
```ts
const id = await captchaSolver.send({
  // url: './captchas/W68HP.gif',
  url: 'https://user-images.githubusercontent.com/16370704/87232185-aad0b680-c3c5-11ea-8cfc-b769bba631d4.gif',
  // any other parameter from documentation,
  // except: method, file, body, key, json and soft_id
  // for example
  regsense: 1,  // for case-sensitive
  numeric: 4,   // for both numbers and letters
  min_len: 5,   //
  max_len: 5,   // for exactly 5 symbols
  language: 2,  // for Roman alphabet
});

// id: '4503599672'
```

### <captchaSolver.get method|#get>
#### Synopsis

captchaSolver.get(id | ids | strIds) → `Promise<captcha_token>` | `Promise<Array<captcha_token>>`

| Name   | Type      | Required   | Description
|--------|-----------|------------|-
| id     | string    | one of all | Id of sent captcha via [send-method](<#send>).
| ids    | Array<id> | one of all | Array of captcha ids.
| strIds | string    | one of all | String of comma-separated captcha ids.

Method for getting captcha solutions.\
Returns promise which resolves as soon as all captchas by provided ids will be solved on service.

#### Example
```ts
import { ArrayLikeString, isArrayLikeString } from './rucaptcha-2captcha/src/types';

const id = '<id1>';
const id2 = '<id2>';
const ids = '<id1>,<id2>';

const token = await captchaSolver.get(id); // 'pgh3Ds'
const tokens = await captchaSolver.get([id, id2]); // ['pgh3Ds', 'q5ZZpt']
const tokens2 = await captchaSolver.get(ids as ArrayLikeString); // ['pgh3Ds', 'q5ZZpt']
if(isArrayLikeString(ids)) {
  const tokens = await captchaSolver.get(ids); // ['pgh3Ds', 'q5ZZpt']
}
```

### <Solution reporting methods|#reports>
#### Synopsis

captchaSolver.reportGood(id) → `Promise<Object>`\
captchaSolver.reportBad(id) → `Promise<Object>`

| Name | Type   | Required | Description
|------|--------|----------|-
| id   | string | yes      | Id of sent captcha via [send-method](<#send>).

Use these methods for reporting captcha results.

**Attention!** It's not necessary but better to send reports cause of refund of bad solutions and increasing solving accuracy by reporting good solutions.\
Returns some info that was sent from server.

#### Example
```ts
const id = '<id1>';
const result = await captchaSolver.reportGood(id);
// or
const result = await captchaSolver.reportBad(id);

// result: { status: 1, request: 'OK_REPORT_RECORDED' }
```

### captchaSolver.solve method
#### Synopsis

captchaSolver.solve(params) → `Promise<Object { token, tokenIsGood, tokenIsBad }>`

##### Request
| Name   | Type   | Required | Description
|--------|--------|----------|-
| params | object | yes      | The same properties as for [captchaSolver.send](<#send>) method.

##### Response
| Name        | Type     | Description
|-------------|----------|-
| token       | string   | Solved captcha token.
| tokenIsGood | function | Call it to report received token is correct.
| tokenIsBad  | function | Call it to report received token is wrong.

captchaSolver.solve method is nothing more but convenient bundle of the next methods:
 - [captchaSolver.send](<#send>)
 - [captchaSolver.get](<#get>)
 - [captchaSolver.reportGood](<#reports>)
 - [captchaSolver.reportBad](<#reports>)

You still can use them on your own.

#### Example
```ts
const { token, tokenIsGood, tokenIsBad } = await captchaSolver.solve({
  url: 'https://user-images.githubusercontent.com/16370704/87232185-aad0b680-c3c5-11ea-8cfc-b769bba631d4.gif',
  regsense: 1,  // for case-sensitive
  numeric: 4,   // for both numbers and letters
  min_len: 5,
  max_len: 5,   // for exactly 5 symbols
  language: 2,  // for Roman alphabet
});

if(token === 'W68HP') {
  console.log('Everything is just fine.');
  await tokenIsGood();
} else {
  console.log('Captcha was solved incorrect:', token);
  await tokenIsBad();
}
```

### captchaSolver.getWithPrice method
#### Synopsis

captchaSolver.getWithPrice(id) → `Promise<Object>`

| Name | Type   | Required | Description
|------|--------|----------|-
| id   | string | yes      | Id of sent captcha via [send-method](<#send>).

Use captchaSolver.getWithPrice method for getting captcha answer with its cost price.

#### Example
```ts
const info = await captchaSolver.getWithPrice(id);
// info: { token: '6p6pck', price: '0.034' }
```

### captchaSolver.getBalance method
#### Synopsis

captchaSolver.getBalance() → `Promise<number>`

Use for getting your account balance.\
Note: don't use it too often because it decreases your API query limit.

#### Example
```ts
const balance = await captchaSolver.getBalance();
// balance: 50.034
```

### captchaSolver.getPrices method
#### Synopsis

captchaSolver.getPrices() → `Promise<Object>`

Use for getting actual service prices.\
Note: this method does not decrease your API query limit.

#### Example
```ts
const prices = await captchaSolver.getPrices();

// Warning! That is current actual prices. Prices and categories may change.
/*
prices in RUR for RuCaptcha service: {
  'Обычная капча': 0.023,
  'Текстовая капча': 0.023,
  'ReCaptcha V2': 0.16,
  'ReCaptcha V3': 0.16,
  GeeTest: 0.16,
  hCaptcha: 0.16,
  'Capy Puzzle': 0.16,
  'ReCaptcha V2 (старый метод)': 0.07,
  ClickCaptcha: 0.07,
  RotateCaptcha: 0.035,
  'FunCaptcha с токеном': 0.16,
  KeyCaptcha: 0.16
}
prices in USD for 2Captcha service: {
  'Normal Captcha': 0.00079,
  'Text Captcha': 0.00079,
  'ReCaptcha V2': 0.00299,
  'ReCaptcha V3': 0.00299,
  GeeTest: 0.00299,
  'ReCaptcha V2 (old method)': 0.0012,
  'Solving ClickCaptcha': 0.0012,
  RotateCaptcha: 0.0005,
  FunCaptcha: 0.0005,
  'FunCaptcha Token Method': 0.00299,
  KeyCaptcha: 0.00299,
  hCaptcha: 0.00299,
  Capy: 0.00299
}
*/
```

---

More info you can find in official documentation: [RuCaptcha Docs][RuCaptchaAPI], [2Captcha Docs][2CaptchaAPI].

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
