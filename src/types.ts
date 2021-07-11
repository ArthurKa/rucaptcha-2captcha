export type Lang = (
  | 'en' | 'ru' | 'es' | 'pt' | 'uk' | 'vi' | 'fr' | 'id' | 'ar' | 'ja' | 'tr' | 'de' | 'zh' | 'fil'
  | 'pl' | 'th' | 'it' | 'nl' | 'sk' | 'bg' | 'ro' | 'hu' | 'ko' | 'cs' | 'az' | 'fa' | 'bn' | 'el'
  | 'lt' | 'lv' | 'sv' | 'sr' | 'hr' | 'he' | 'hi' | 'nb' | 'sl' | 'da' | 'uz' | 'fi' | 'ca' | 'ka'
  | 'ms' | 'te' | 'et' | 'ml' | 'be' | 'kk' | 'mr' | 'ne' | 'my' | 'bs' | 'hy' | 'mk' | 'pa'
);

type Number0_1 = 0 | 1;
type Number0_2 = Number0_1 | 2;
type Number0_4 = Number0_2 | 3 | 4;
type Number0_20 = Number0_4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;


interface ISendNormalByUrl {
  url: string;
  method?: undefined;
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}
interface ISendNormalWithFile {
  url?: undefined;
  method: 'post';
  file: string;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}
interface ISendNormalWithBody {
  url?: undefined;
  method: 'base64';
  file?: undefined;
  body: string;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendText {
  url?: undefined;
  method?: undefined;
  file?: undefined;
  body?: undefined;
  textcaptcha: string;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendReV2 {
  url?: undefined;
  method: 'userrecaptcha';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey: string;
  pageurl: string;
  cookies?: string;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendReV3 {
  url?: undefined;
  method: 'userrecaptcha';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version: 'v3';
  googlekey: string;
  pageurl: string;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendReV3Enterprise {
  url?: undefined;
  method: 'userrecaptcha';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version: 'enterprise';
  googlekey: string;
  pageurl: string;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendReV2OldMethodWithFile {
  url?: undefined;
  method: 'post';
  file: string;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha: 1;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}
interface ISendReV2OldMethodWithBody {
  url?: undefined;
  method: 'base64';
  file?: undefined;
  body: string;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha: 1;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendClickWithFile {
  url?: undefined;
  method: 'post';
  file: string;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha: 1;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}
interface ISendClickWithBody {
  url?: undefined;
  method: 'base64';
  file?: undefined;
  body: string;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha: 1;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendRotate {
  url?: undefined;
  method: 'rotatecaptcha';
  file?: string;
  body?: string;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl?: undefined;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendFun {
  url?: undefined;
  method: 'funcaptcha';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl: string;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey: string;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendKey {
  url?: undefined;
  method: 'keycaptcha';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl: string;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id: string;
  s_s_c_session_id: string;
  s_s_c_web_server_sign: string;
  s_s_c_web_server_sign2: string;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendGee {
  url?: undefined;
  method: 'geetest';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl: string;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt: string;
  challenge: string;
  sitekey?: undefined;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendH {
  url?: undefined;
  method: 'hcaptcha';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl: string;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey: string;
  captchakey?: undefined;
  aid?: undefined;
  host?: undefined;
}

interface ISendCapy {
  url?: undefined;
  method: 'capy';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl: string;
  cookies?: undefined;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey: string;
  aid?: undefined;
  host?: undefined;
}

interface ISendTikTok {
  url?: undefined;
  method: 'tiktok';
  file?: undefined;
  body?: undefined;
  textcaptcha?: undefined;
  version?: undefined;
  googlekey?: undefined;
  pageurl: string;
  cookies: string;
  recaptcha?: undefined;
  coordinatescaptcha?: undefined;
  publickey?: undefined;
  s_s_c_user_id?: undefined;
  s_s_c_session_id?: undefined;
  s_s_c_web_server_sign?: undefined;
  s_s_c_web_server_sign2?: undefined;
  gt?: undefined;
  challenge?: undefined;
  sitekey?: undefined;
  captchakey?: undefined;
  aid: number;
  host: string;
}


interface ISendCommonParams {
  phrase?: Number0_1;
  regsense?: Number0_1;
  numeric?: Number0_4;
  calc?: Number0_1;
  min_len?: Number0_20;
  max_len?: Number0_20;
  language?: Number0_2;
  lang?: Lang;
  textinstructions?: string;
  imginstructions?: any;
  header_acao?: Number0_1;
  pingback?: string;
  invisible?: Number0_1;
  'data-s'?: string;
  userAgent?: string;
  proxy?: string;
  proxytype?: string;
  action?: string;
  min_score?: number;
  canvas?: Number0_1;
  recaptcharows?: number;
  recaptchacols?: number;
  previousID?: string;
  can_no_answer?: Number0_1;
  angle?: number;
  surl?: string;
  data?: Record<string, any>;
  api_server?: string;
  // [k: string]: any;
}

interface ISendNormalCaptchaByUrl extends ISendNormalByUrl, ISendCommonParams {}
interface ISendNormalCaptchaWithFile extends ISendNormalWithFile, ISendCommonParams {}
interface ISendNormalCaptchaWithBody extends ISendNormalWithBody, ISendCommonParams {}
interface ISendTextCaptcha extends ISendText, ISendCommonParams {}
interface ISendReCaptchaV2 extends ISendReV2, ISendCommonParams {}
interface ISendReCaptchaV3 extends ISendReV3, ISendCommonParams {}
interface ISendReCaptchaV3Enterprise extends ISendReV3Enterprise, ISendCommonParams {}
interface ISendReV2CaptchaOldMethodWithFile extends ISendReV2OldMethodWithFile, ISendCommonParams {}
interface ISendReV2CaptchaOldMethodWithBody extends ISendReV2OldMethodWithBody, ISendCommonParams {}
interface ISendClickCaptchaWithFile extends ISendClickWithFile, ISendCommonParams {}
interface ISendClickCaptchaWithBody extends ISendClickWithBody, ISendCommonParams {}
interface ISendRotateCaptcha extends ISendRotate, ISendCommonParams {}
interface ISendFunCaptcha extends ISendFun, ISendCommonParams {}
interface ISendKeyCaptcha extends ISendKey, ISendCommonParams {}
interface ISendGeeTest extends ISendGee, ISendCommonParams {}
interface ISendHCaptcha extends ISendH, ISendCommonParams {}
interface ISendCapyPuzzle extends ISendCapy, ISendCommonParams {}
interface ISendISendTikTokCaptcha extends ISendTikTok, ISendCommonParams {}

export type ServiceGetResponse = {
  data: {
    status: number;
    request: string;
    [k: string]: any;
  };
};
export type ServiceGet2Response = {
  data: {
    status: number;
    price: string;
    request: string;
    [k: string]: any;
  };
};

export type ArrayLikeString = string & { badge: 'ArrayLikeString'; };
export function isArrayLikeString(e: string): e is ArrayLikeString {
  return e.includes(',');
}

export interface ICaptchaSolver {
  send(params: (
    | ISendNormalCaptchaByUrl
    | ISendNormalCaptchaWithFile
    | ISendNormalCaptchaWithBody
    | ISendTextCaptcha
    | ISendReCaptchaV2
    | ISendReCaptchaV3
    | ISendReCaptchaV3Enterprise
    | ISendReV2CaptchaOldMethodWithFile
    | ISendReV2CaptchaOldMethodWithBody
    | ISendClickCaptchaWithFile
    | ISendClickCaptchaWithBody
    | ISendRotateCaptcha
    | ISendFunCaptcha
    | ISendKeyCaptcha
    | ISendGeeTest
    | ISendHCaptcha
    | ISendCapyPuzzle
    | ISendISendTikTokCaptcha
  )): never | Promise<string>;

  get(captchaId: ArrayLikeString): never | Promise<string[]>;
  get(captchaId: string): never | Promise<string>;
  get(captchaId: string[]): never | Promise<string[]>;

  getWithPrice(captchaId: string): Promise<{
    token: ServiceGetResponse['data']['request'];
    price: string;
    [k: string]: any;
  }>;
  reportGood: (id: string) => never | Promise<ServiceGetResponse['data']>;
  reportBad: (id: string) => never | Promise<ServiceGetResponse['data']>;
  getBalance(): Promise<number>;
  getPrices(): Promise<Record<string, number>>;
  solve(...params: Parameters<ICaptchaSolver['send']>): Promise<{
    token: string;
    tokenIsGood(): ReturnType<ICaptchaSolver['reportGood']>;
    tokenIsBad(): ReturnType<ICaptchaSolver['reportBad']>;
  }>;
}
