import { merge } from 'lodash';
import InertiaRequest, { RequestStateHandlers } from './InertiaRequest';

async function visit(
  pageName: string,
  opts: InertiaVisitOptions,
  data: RequestInit['body'] = null,
) {
  const params = merge(opts, { body: data });
  InertiaRequest.instance()
    .argvs({ path: pageName, ...params })
    .send()
    .catch(() => {
      //
    });
}

function post(
  pageName: string,
  opts: InertiaPostOptions,
  data: RequestInit['body'] = null,
) {
  visit(pageName, { ...opts, method: 'post' }, data);
}

export const Inertia = { visit, post };

export interface InertiaVisitOptions extends RequestStateHandlers {
  method?: RequestInit['method'];
  headers?: RequestInit['headers'];
}

export interface InertiaPostOptions extends InertiaVisitOptions {
  method?: never;
}
