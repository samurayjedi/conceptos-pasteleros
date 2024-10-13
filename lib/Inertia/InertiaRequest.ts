import { pick } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import Cookie from './Cookies';

let loadingIndicator: IndicatorComponent | null = null;

let myInstance: InertiaRequest;
export default class InertiaRequest {
  private status: 'pending' | 'success' | 'error';

  private controller: AbortController | null = null;

  private response: InertiaPage | null;

  private error: Error | null;

  private argv: RequestProps;

  private listeners: Record<string, Record<string, Listener>> = {};

  private csrfToken: string | null = null;

  private inertiaVersion: string | null = null;

  constructor(private server: string) {
    if (!myInstance) {
      this.server = server;
      this.argv = {
        path: '/',
      };
      this.status = 'success';
      this.response = null;
      this.error = null;
      this.controller = null;
      return;
    }
    throw new Error('Cannot create new instance of InertiaRequest.');
  }

  static init(s: string) {
    if (!myInstance) {
      myInstance = new InertiaRequest(s);
    }
  }

  static instance() {
    if (!myInstance) {
      throw new Error('Inertia Request no instantiate!!!!');
    }
    return myInstance;
  }

  argvs(p: RequestProps | ((prev: RequestProps) => RequestProps)) {
    if (typeof p === 'function') {
      this.argv = p(this.argv);
    } else {
      this.argv = p;
    }
    return this;
  }

  addListener(type: ListenerType, id: string, callback: Listener) {
    if (Object.hasOwnProperty.call(this.listeners, type)) {
      if (Object.hasOwnProperty.call(this.listeners[type], id)) {
        this.listeners[type] = pick(this.listeners[type], [id]);
      }
    }
    if (!Object.hasOwnProperty.call(this.listeners, type)) {
      this.listeners[type] = {};
    }
    this.listeners[type][id] = callback;
    return this;
  }

  private reset() {
    // reset
    const newAttrs = pick(
      this.argv,
      Object.keys(this.argv).filter((key) => key !== 'path'),
    ) as RequestProps;
    this.argv = newAttrs;
  }

  private executeListeners(type: ListenerType, argv: ListenerArgv = undefined) {
    if (Object.hasOwnProperty.call(this.listeners, type)) {
      Object.values(this.listeners[type]).forEach((callback) => callback(argv));
    }
  }

  send() {
    /** Cancel any request pending */
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
    this.status = 'pending';
    /** First, request the X-Inertia-Version from the server */
    return this.xInertiaVersion(() => {
      /** Now the CSRF Token */
      return this.xsrfToken(() => this.sendBase());
    });
  }

  private async xInertiaVersion(callback: () => Promise<InertiaPage>) {
    if (!this.inertiaVersion) {
      const version = await fetch(`${this.server}/api/x-inertia-version`, {
        method: 'get',
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.text();
          }

          throw new Error('Unable to get the X-Inertia-Version header!!');
        })
        .catch((error) => {
          this.status = 'error';
          this.error = new Error(`X-Inertia-Version Fetch Throw: ${error}`);

          throw this.error;
        });

      this.inertiaVersion = version;
    }

    return callback();
  }

  private async xsrfToken(callback: () => Promise<InertiaPage>) {
    switch (this.argv.method) {
      case 'post':
      case 'put':
      case 'delete':
        /** In theory, the same token would serve for the future requests, but when i use the old,
         * laravel throw me 419, so better i request it every time...
         */
        const token = await fetch(`${this.server}/sanctum/csrf-cookie`, {
          // credentials: 'include',
          method: 'get',
        })
          .then((resp) => {
            if (resp.ok) {
              return resp.headers;
            }

            throw new Error('Unable to get the crsf token');
          })
          .then((headers) => {
            const cookie = new Cookie(headers);
            return cookie.get('XSRF-TOKEN').value;
          })
          .catch((error) => {
            this.status = 'error';
            this.error = new Error(`XSRF-TOKEN Fetch Throw: ${error}`);

            throw this.error;
          });

        this.csrfToken = token;
    }

    return callback();
  }

  private sendBase() {
    const { path, onBefore, onSuccess, onError, onFinish, ...opts } = this.argv;
    /** Befofe Listeners */
    if (onBefore) {
      onBefore();
    }
    this.executeListeners('onBefore');
    /** Request */
    // Abort controller, in this.send() is setted to null.
    this.controller = new AbortController();
    const fetchParams: RequestInit = {
      ...opts,
      signal: this.controller.signal,
      headers: {
        // 'Content-Type': 'application/json', JSON.stringify
        // 'Content-Type': 'application/x-www-form-urlencoded', // URLSearchParams
        // 'Content-Type': 'multipart/form-data', // FormData
        'X-Inertia': 'true',
        'X-Inertia-Version': this.inertiaVersion || '',
        'X-Inertia-isMobile': 'true',
        'X-XSRF-TOKEN': this.csrfToken || '',
        ...opts.headers,
      },
    };
    const promise: Promise<InertiaPage> = fetch(
      `${this.server}${path}`,
      fetchParams,
    ).then(async (resp) => {
      this.reset();
      let data = null;
      if (resp.ok) {
        this.status = 'success';
        data = await resp.json();
        /** Success Listeners */
        if (onSuccess) {
          onSuccess(data);
        }
        this.executeListeners('onSuccess', data);
      } else {
        this.status = 'error';
        switch (resp.status) {
          case 422:
            const errors: InertiaError = await resp.json();
            /** Error listeners */
            if (onError) {
              onError(errors);
            }
            this.executeListeners('onError', errors);
            break;
          default:
            const rawResponse = await resp.text();
            throw new Error(
              `Request throw http status ${resp.status} with text:\n\n${rawResponse}`,
            );
        }
      }
      if (onFinish) {
        onFinish();
      }
      this.executeListeners('onFinish');
      if (data) {
        return data;
      }
      // return the last successful response, if there isn't one, well, the app was screwed :/
      return this.response;
    });

    return promise;
  }

  sendInSuspense() {
    // fix same request is sended two times in react
    if (!this.argv.path) {
      return {
        read: () => this.response as InertiaPage,
      };
    }

    const promise = new Promise<void>((resolve) => {
      this.send()
        .then((data) => {
          this.response = data;
          resolve();
        })
        .catch((err) => {
          this.status = 'error';
          this.error = new Error(err);

          console.error(err);
        });
    });

    return {
      read: () => {
        switch (this.status) {
          case 'success':
            if (this.response) {
              return this.response;
            }
            throw new Error('response is null');
          case 'error':
            throw this.error;
          default:
            throw promise;
        }
      },
    };
  }

  static Indicator() {
    return loadingIndicator || View;
  }

  static setIndicator(indicator: IndicatorComponent) {
    loadingIndicator = indicator;
  }

  theState() {
    return this.status;
  }
}

export interface RequestStateHandlers {
  onBefore?: () => void;
  onSuccess?: (page: InertiaPage) => void;
  onError?: (error: InertiaError) => void;
  onFinish?: () => void;
}

type RequestProps = RequestInit &
  RequestStateHandlers & {
    path: string;
  };

type Listener = (params: ListenerArgv) => void;
type ListenerType = keyof RequestStateHandlers;
type ListenerArgv = InertiaPage | InertiaError | undefined;

type IndicatorComponent =
  | React.FunctionComponent<Record<string, unknown>>
  | React.ComponentClass<Record<string, unknown>>;
