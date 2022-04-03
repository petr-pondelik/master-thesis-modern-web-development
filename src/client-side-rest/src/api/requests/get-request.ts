import ApiConfig from '../api-config';
import { getJwtFromStorage } from '../../store';

export async function getRequest<T>(url: string): Promise<T> {
  url = `${ApiConfig.path()}${url}`;

  const jwt = getJwtFromStorage();

  const init: any = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (jwt) {
    init.headers['Authorization'] = `Bearer ${jwt}`;
  }

  return fetch(url, init)
    .then(res => res.json() as Promise<T>)
}