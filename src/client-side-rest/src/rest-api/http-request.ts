import ApiConfig from './api-config';
import { HttpMethod } from '../common';

export async function HttpRequest(url: string, method: HttpMethod = 'GET', dto: object = {}) {
  url = `${ApiConfig.path()}${url}`;

  const defaultInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let customInit = {};

  switch (method) {
    case 'POST':
      customInit = {
        body: JSON.stringify(dto),
      };
  }

  const init = { ...defaultInit, ...customInit };

  return await fetch(url, init).then(res => res.json());
}

export default HttpRequest;