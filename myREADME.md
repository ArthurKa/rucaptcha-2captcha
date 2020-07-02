<header>

Helps you to operate with [RuCaptcha](https://rucaptcha.com) or [2Captcha](https://2captcha.com) conveniently.

Full documentation you can find on [https://rucaptcha.com/api-rucaptcha](https://rucaptcha.com/api-rucaptcha) and [https://2captcha.com/2captcha-api](https://2captcha.com/2captcha-api) respectively.

<installation>

## Usage
### Initialization
```js
const RuCaptcha2Captcha = require('.');

const captchaSolver = new RuCaptcha2Captcha(<YOUR_API_KEY>);
// or for operating with 2Captcha.com
const captchaSolver = new RuCaptcha2Captcha(<YOUR_API_KEY>, '2captcha');

```
**<YOUR_API_KEY>** you can find in your account settings ([RuCaptcha](https://rucaptcha.com/setting) | [2Captcha](https://2captcha.com/setting))

### captchaSolver.send method

Use this method to send captcha for solve. Returns `Promise<capthca_id>`.\
For example:
```js
const id = await captchaSolver.send({
  method: 'base64',
  body: <base64_image_body>,
});

// id: '4503599627'
```

### captchaSolver.sendFile method

Use this method to send captcha as image from your local file system. Returns `Promise<capthca_id>`.\
For example:
```js
const id = await captchaSolver.sendFile('./captcha.jpg', {
  min_len: 6,
  max_len: 6,
  regsense: 1,
  numeric: 4,
});

// id: '4503599627'
```

### captchaSolver.get method

Method for getting captcha solutions. Returns `Promise<captcha_token>` or `Promise<Array<captcha_token>>` which resolves as soon as captcha(s) will be solved on service.
```js
  const token = await catpchaSolver.get(id);
  // token: 'ABCD'

  // or
  const tokens = await catpchaSolver.get([id1, id2, ...]);
  // tokens: ['ABCD', 'abcd', ...]

  // or
  const tokens = await catpchaSolver.get('<id1>,<id2>,...');
  // tokens: ['ABCD', 'abcd', ...]
```

### captchaSolver.reportGood and captchaSolver.reportBad methods

Use these methods for reporting captcha results. It's not necessary but better to send reports cause of refund of bad solutions and increasing solving accuracy by reporting good solutions.
```js
  const result = await catpchaSolver.reportGood(id);
  // or
  const result = await catpchaSolver.reportBad(id);
  // result: { status: 1, request: 'OK_REPORT_RECORDED' }
```

### captchaSolver.get2 method

Use captchaSolver.get2 method for getting captcha answer with its cost price. Returns `Promise<Object>`.
```js
  const info = await catpchaSolver.get2(id);
  // info: { request: '6p6pck', price: '0.034' }
```

### captchaSolver.getBalance method

Use for getting your account balance.
```js
  const balance = await catpchaSolver.getBalance();
  // balance: 50.034
```
Note: don't use it too often because it decreases your query limit to **RuCaptcha** (**2Captcha**) server.

---

Note that **json**, **key** and **soft_id** are not writable parameters of any method.

More info you can find in documentation ([RuCaptcha](https://rucaptcha.com/api-rucaptcha) | [2Captcha](https://2captcha.com/2captcha-api)).

<noTesting>

<suggestions>
