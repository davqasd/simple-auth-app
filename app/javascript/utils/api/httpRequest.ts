import axios, { AxiosResponse } from 'axios';

import { IRequest } from './index';

export function getRootURL(
  url: { protocol: string; hostname: string; port: string } | string = {
    protocol: window.location.protocol.split(':')[0],
    hostname: window.location.hostname,
    port: window.location.port,
  },
): string {
  return typeof url === 'string' ? url : `${url.protocol}://${url.hostname}${url.port && `:${url.port}`}`;
}

const HOST = process.env.BACKEND_URL;
const VERSION = 'api/';

export function httpRequest<T extends any>({
  url,
  method,
  query,
  payload,
  headers,
}: IRequest): Promise<AxiosResponse<T>> {
  let fullUrl = `${VERSION}/${url}`.replace('//', '/').replace('??', '?');
  if (process.browser) {
    fullUrl = getRootURL() + '/' + fullUrl;
  } else {
    fullUrl = HOST + fullUrl;
  }

  return axios({
    method: method,
    url: fullUrl,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    data: payload,
    params: query,
    validateStatus: (status: number) => {
      return status >= 200 && status < 300;
    },
  });
}
