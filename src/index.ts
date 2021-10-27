import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';
import { ArrayLikeString, ICaptchaSolver, ServiceGet2Response, ServiceGetResponse } from './types';
import { ThenArg } from './typeUtils';

export { ArrayLikeString };
export { isArrayLikeString } from './types';

const wait = (s: number) => new Promise<void>(res => setTimeout(res, s * 1000));

function throwErrorOfBadStatus(
  status: ServiceGetResponse['data']['status'],
  data: Omit<ServiceGetResponse['data'], 'status'>,
): void | never {
  if(!status && data.request !== 'CAPCHA_NOT_READY') {
    const e = new Error(data.error_text);
    e.name = data.request;
    throw e;
  }
}

function RuCaptcha2Captcha(key: string, captchaService?: 2 | '2') {
  const isRuCaptcha = captchaService !== 2 && captchaService !== '2';
  const domain = `https://${isRuCaptcha ? 'ru' : 2}captcha.com` as const;

  const sendUrl = `${domain}/in.php` as const;
  const getUrl = `${domain}/res.php` as const;
  const priceUrls = {
    all: isRuCaptcha ? 'https://rucaptcha.com/api-rucaptcha#rates' : 'https://2captcha.com/2captcha-api#rates',
    normal: `${domain}/public_statistics`,
  } as const;

  const waitings: Record<string, Promise<void>> = {};

  const makeReport = (type: 'good' | 'bad') => (
    (id: string) => axios
      .get(getUrl, {
        params: {
          key,
          action: `report${type}`,
          id,
          json: 1,
        },
      })
      .then((e: ServiceGetResponse) => e.data)
      .catch(e => {
        if(e.message === 'Request failed with status code 500') {
          const res: ServiceGetResponse['data'] = { status: 1, request: 'OK_REPORT_RECORDED' };
          return res;
        }
        throw e;
      })
  );

  const res: ICaptchaSolver = {
    async send({ url, method, file, body, ...restParams }) {
      let p: {
        method: typeof method;
        file?: typeof file;
        body: typeof body;
      } = {
        method,
        file,
        body,
      };
      if(url) {
        let buffer: Buffer;
        try {
          buffer = fs.readFileSync(url);
        } catch(e) {
          const { data } = await axios.get(url, { responseType: 'arraybuffer' });
          buffer = Buffer.from(data, 'binary');
        }

        p = {
          method: 'base64',
          body: buffer.toString('base64'),
        };
      }

      type P = Parameters<ICaptchaSolver['send']>[0];
      type Params = P & {
        key: typeof key;
        json: 1;
        soft_id: 2721;
      };

      const params = {
        ...Object.fromEntries(Object.entries(p).filter(e => e[1] != null)),
        ...restParams,
        key,
        json: 1,
        soft_id: 2721,
      } as Params;
      const { data: { status, ...data } }: ServiceGetResponse = await axios.post(sendUrl, params);

      throwErrorOfBadStatus(status, data);
      const { request: id } = data;

      type Method = NonNullable<Parameters<ICaptchaSolver['send']>[0]['method']> | '';
      const m = (params.method || '').toLowerCase() as Method;
      const timeToWaitInSeconds = true
        && (['post', 'base64', ''] as Method[]).includes(m)
        && params.recaptcha == null
        && params.coordinatescaptcha == null
        ? 5
        : 20;
      waitings[id] = wait(timeToWaitInSeconds);

      return id;
    },

    async get(id: string | string[] | ArrayLikeString) {
      const ids = String(id).split(/\s*,\s*/);

      while(1) {
        await Promise.all(ids.map(id => waitings[id]));

        const { data: { status, ...data } }: ServiceGetResponse = await axios.get(getUrl, {
          params: {
            key,
            action: 'get',
            [`id${ids.length > 1 ? 's' : ''}`]: ids.join(),
            json: 1,
          },
        });

        throwErrorOfBadStatus(status, data);

        const res = data.request.split('|') as [string, ...string[]];
        if(res.every(e => e !== 'CAPCHA_NOT_READY')) {
          return (Array.isArray(id) || typeof id === 'string' && id.match(/,/) ? res : res[0]) as any;
        }

        if(res.length === ids.length) {
          const arr = ids
            .map((id, i) => ({ id, captcha: res[i] }))
            .filter(({ captcha }) => captcha === 'CAPCHA_NOT_READY');

          for(const { id } of arr) {
            waitings[id] = wait(5);
          }
        } else {
          for(const id of ids) {
            waitings[id] = wait(5);
          }
        }
      }

      throw new Error();
    },

    async getWithPrice(id) {
      // eslint-disable-next-line no-param-reassign
      id = String(id);

      while(1) {
        await waitings[id];

        const { data: { status, ...data } }: ServiceGet2Response = await axios.get(getUrl, {
          params: {
            key,
            action: 'get2',
            id,
            json: 1,
          },
        });

        throwErrorOfBadStatus(status, data);

        if(data.request !== 'CAPCHA_NOT_READY') {
          const { request: token, ...rest } = data;

          return { token, ...rest };
        }

        waitings[id] = wait(5);
      }

      throw new Error();
    },

    reportGood: makeReport('good'),
    reportBad: makeReport('bad'),

    async getBalance() {
      const { data }: { data: ThenArg<ReturnType<ICaptchaSolver['getBalance']>> } = await axios.get(getUrl, {
        params: {
          key,
          action: 'getbalance',
        },
      });

      return data;
    },

    async getPrices() {
      const normalNames: string[] = [];

      const [normalPrice, otherPrices] = await Promise.all([
        axios.get(priceUrls.normal).then(({ data }) => {
          const $ = cheerio.load(data, { decodeEntities: false });
          const price = ($ as any as { text: () => string }).text().match(/[i$] ?([\d.]+)/) as [string, string] | null;
          return price && +(Number(price[1]) / 1000).toFixed(7) || NaN;
        }),
        axios.get(priceUrls.all).then(({ data }) => {
          const $ = cheerio.load(data, { decodeEntities: false });
          const table = $($('.table').toArray().find(e => $(e).text().match(/Type of captcha|Вид капчи/i)));
          return table.find('tr').toArray().slice(1).reduce<Record<string, number>>((obj, e) => {
            const [types, price] = $(e).find('td').toArray().map((e, i) => (
              i ? e : $(e).find('a').toArray()
            )) as any as [Element[], Element];

            const p = +(Number($(price).text().replace(/\$/g, '')) / 1000).toFixed(7) || NaN;
            for(const type of types) {
              const t = $(type).text().trim();
              if(Number.isNaN(p)) {
                normalNames.push(t);
              } else {
                // eslint-disable-next-line no-param-reassign
                obj[t] = p;
              }
            }

            return obj;
          }, {});
        }),
      ]);

      const normalPrices = Object.fromEntries(normalNames.map(e => [e, normalPrice]));

      return {
        ...normalPrices,
        ...otherPrices,
      };
    },

    async solve(...params: Parameters<typeof res.send>) {
      const id = await res.send(...params);
      const token = await res.get(id);

      return {
        token,
        tokenIsGood: res.reportGood.bind(null, id),
        tokenIsBad: res.reportBad.bind(null, id),
      };
    },
  };

  return res;
}

export default RuCaptcha2Captcha as any as new (...params: Parameters<typeof RuCaptcha2Captcha>) => ReturnType<typeof RuCaptcha2Captcha>;
