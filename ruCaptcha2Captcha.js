'use strict';

const fs = require('fs');
const axios = require('axios');

const wait = s => new Promise(res => setTimeout(res, s * 1000));

function throwErrorOfBadStatus(status, data) {
  if(!status && data.request !== 'CAPCHA_NOT_READY') {
    const e = new Error(data.error_text);
    e.name = data.request;
    throw e;
  }
}

function RuCaptcha2Captcha(key, twoCaptcha = '') {
  if(!new.target) {
    return new RuCaptcha2Captcha(key, twoCaptcha);
  }

  const ruOr2 = String(twoCaptcha).toLowerCase().trim() === '2captcha' ? 2 : 'ru';
  const sendUrl = `https://${ruOr2}captcha.com/in.php`;
  const getUrl = `https://${ruOr2}captcha.com/res.php`;

  const waits = {};

  this.send = async parameters => {
    const params = {
      ...parameters,
      key,
      json: 1,
      soft_id: 2721,
    };
    const { data: { status, ...data } } = await axios.post(sendUrl, params);

    throwErrorOfBadStatus(status, data);
    const { request: id } = data;

    const method = (params.method || '').toLowerCase();
    const timeToWaitInSeconds = ['post', 'base64', ''].includes(method) && params.recaptcha == null && params.coordinatescaptcha == null
      ? 5
      : 20;
    waits[id] = wait(timeToWaitInSeconds);

    return data;
  };

  this.sendFile = (filePath, { file, ...params } = {}) => {
    const body = fs.readFileSync(filePath).toString('base64');

    return this.send({
      ...params,
      method: 'base64',
      body,
    });
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

  this.get2 = async id => {
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
        return data;
      }

      waits[id] = wait(5);
    }
  };

  const makeReport = type => {
    return async id => {
      try {
        const { data } = await axios.get(getUrl, {
          params: {
            key,
            action: `report${type}`,
            id,
            json: 1,
          },
        });
        return data;
      } catch(e) {
        if(e.message === 'Request failed with status code 500') {
          return { status: 1, request: 'OK_REPORT_RECORDED' };
        }
        throw e;
      }
    };
  };

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
};

module.exports = RuCaptcha2Captcha;
