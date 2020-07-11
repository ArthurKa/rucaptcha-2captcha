'use strict';

const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const wait = s => new Promise(res => setTimeout(res, s * 1000));

function throwErrorOfBadStatus(status, data) {
  if(!status && data.request !== 'CAPCHA_NOT_READY') {
    const e = new Error(data.error_text);
    e.name = data.request;
    throw e;
  }
}

function RuCaptcha2Captcha(key, twoCaptcha = null) {
  if(!new.target) {
    return new RuCaptcha2Captcha(key, twoCaptcha);
  }

  const isRuCaptcha = ![2, '2'].includes(twoCaptcha);
  const domain = `https://${isRuCaptcha ? 'ru' : 2}captcha.com`;

  const sendUrl = `${domain}/in.php`;
  const getUrl = `${domain}/res.php`;
  const priceUrls = {
    all: isRuCaptcha ? 'https://rucaptcha.com/api-rucaptcha#rates' : 'https://2captcha.com/2captcha-api#rates',
    normal: `${domain}/public_statistics`,
  };

  const waits = {};

  this.send = async ({ url, method, file, body, ...restParams }) => {
    let p = {
      method,
      file,
      body,
    };
    if(url) {
      let buffer;
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

    const params = {
      ...Object.fromEntries(Object.entries(p).filter(e => e[1] != null)),
      ...restParams,
      key,
      json: 1,
      soft_id: 2721,
    };
    const { data: { status, ...data } } = await axios.post(sendUrl, params);

    throwErrorOfBadStatus(status, data);
    const { request: id } = data;

    const m = (params.method || '').toLowerCase();
    const timeToWaitInSeconds = ['post', 'base64', ''].includes(m) && params.recaptcha == null && params.coordinatescaptcha == null
      ? 5
      : 20;
    waits[id] = wait(timeToWaitInSeconds);

    return id;
  };

  this.get = async id => {
    const ids = String(id).split(/\s*,\s*/);

    while(1) {
      await Promise.all(ids.map(id => waits[id]));

      const { data: { status, ...data } } = await axios.get(getUrl, {
        params: {
          key,
          action: 'get',
          [`id${ids.length > 1 ? 's' : ''}`]: ids.join(),
          json: 1,
        },
      });

      throwErrorOfBadStatus(status, data);

      const res = data.request.split('|');
      if(res.every(e => e !== 'CAPCHA_NOT_READY')) {
        return Array.isArray(id) || typeof id == 'string' && id.match(/,/) ? res : res[0];
      }

      if(res.length === ids.length) {
        const arr = ids
          .map((id, i) => ({ id, captcha: res[i] }))
          .filter(({ captcha }) => captcha === 'CAPCHA_NOT_READY');

        for(const { id } of arr) {
          waits[id] = wait(5);
        }
      } else {
        for(const id of ids) {
          waits[id] = wait(5);
        }
      }
    }
  };

  this.getWithPrice = async id => {
    id = String(id);
    while(1) {
      await waits[id];

      const { data: { status, ...data } } = await axios.get(getUrl, {
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

      waits[id] = wait(5);
    }
  };

  const makeReport = type => id => axios
    .get(getUrl, {
      params: {
        key,
        action: `report${type}`,
        id,
        json: 1,
      },
    })
    .then(e => e.data)
    .catch(e => {
      if(e.message === 'Request failed with status code 500') {
        return { status: 1, request: 'OK_REPORT_RECORDED' };
      }
      throw e;
    });

  this.reportBad = makeReport('bad');
  this.reportGood = makeReport('good');

  this.getBalance = async () => {
    const { data } = await axios.get(getUrl, {
      params: {
        key,
        action: 'getbalance',
      },
    });

    return data;
  };

  this.getPrices = async () => {
    const nornamNames = [];

    const [normalPrice, otherPrices] = await Promise.all([
      axios.get(priceUrls.normal).then(({ data }) => {
        const $ = cheerio.load(data, { decodeEntities: false });
        return +($($('#market-price').toArray()[0]).text() / 1000).toFixed(7);
      }),
      axios.get(priceUrls.all).then(({ data }) => {
        const $ = cheerio.load(data, { decodeEntities: false });
        const table = $($('.table').toArray().find(e => $(e).text().match(/Type of captcha|Вид капчи/i)));
        return table.find('tr').toArray().slice(1).reduce((obj, e) => {
          const [types, price] = $(e).find('td').toArray().map((e, i) => {
            if(!i) {
              return $(e).find('a').toArray();
            }
            return e;
          });

          const p = +($(price).text().replace(/\$/g, '') / 1000).toFixed(7);
          for(const type of types) {
            const t = $(type).text().trim();
            if(isNaN(p)) {
              nornamNames.push(t);
            } else {
              obj[t] = p;
            }
          }

          return obj;
        }, {});
      }),
    ]);

    const normalPrices = Object.fromEntries(nornamNames.map(e => [e, normalPrice]));

    return {
      ...normalPrices,
      ...otherPrices,
    };
  };

  this.solve = async (...params) => {
    const id = await this.send(...params);
    const token = await this.get(id);

    return {
      token,
      tokenIsGood: this.reportGood.bind(null, id),
      tokenIsBad: this.reportBad.bind(null, id),
    };
  };
};

module.exports = RuCaptcha2Captcha;
