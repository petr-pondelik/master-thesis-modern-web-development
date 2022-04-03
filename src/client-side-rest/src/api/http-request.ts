import ApiConfig from './api-config';
import { HttpMethod, StatusCodes } from '../common';
import { getJwtFromStorage } from '../store';

export async function HttpRequest(url: string, method: HttpMethod = 'GET', dto: any = undefined) {
  url = `${ApiConfig.path()}${url}`;

  const jwt = getJwtFromStorage();

  const defaultInit: any = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (jwt) {
    defaultInit.headers['Authorization'] = `Bearer ${jwt}`;
  }

  let customInit = {};

  switch (method) {
    case 'POST':
      customInit = {
        body: JSON.stringify(dto),
      };
  }

  const init = { ...defaultInit, ...customInit };

  return fetch(url, init).then(res => {
    if (res.status === 204) {
      return new Promise<boolean>((resolve => resolve(true)));
    } else {
      return res.json();
    }
  });
}

export default HttpRequest;