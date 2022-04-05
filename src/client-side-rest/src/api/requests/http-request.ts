import ApiConfig from '../api-config';
import { HttpMethod } from '../../common';
import { getJwtFromStorage } from '../../store';

export async function HttpRequest<TResponse, TDto = undefined>(
  url: string, method: HttpMethod = 'GET', dto: TDto | undefined = undefined): Promise<TResponse> {

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
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
    customInit = {
      body: JSON.stringify(dto),
    };
  }

  const init = { ...defaultInit, ...customInit };

  return fetch(url, init).then(res => {
    if (res.status === 204) {
      return new Promise<TResponse>((resolve => resolve({ data: [], _links: [] } as unknown as TResponse)));
    } else {
      return res.json() as Promise<TResponse>;
    }
  });

}

export default HttpRequest;