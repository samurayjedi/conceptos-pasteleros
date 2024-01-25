import SetCookieParser from 'set-cookie-parser';
import { flattenDeep } from 'lodash';

export default class Cookies {
  private setCookie: Array<CookieItem>;

  constructor(headers: Headers) {
    const set_cookies: Array<CookieItem[]> = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of headers as any) {
      if (name === 'set-cookie') {
        set_cookies.push(SetCookieParser.parse(value));
      }
    }
    this.setCookie = flattenDeep(set_cookies);
  }

  get(key: string) {
    for (let i = 0; i < this.setCookie.length; i++) {
      const cookie = this.setCookie[i];
      if (cookie.name === key) {
        return this.setCookie[i];
      }
    }
    throw new Error(`Cookie ${key} no found.`);
  }
}

interface CookieItem {
  name: string;
  value: string;
}
