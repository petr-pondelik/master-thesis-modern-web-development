import ApiConfig from '../api-config';
import { getJwtFromStorage } from '../../store';

export async function postRequest<T, S>(url: string, dto: S): Promise<T> {
  url = `${ApiConfig.path()}${url}`;

  const jwt = getJwtFromStorage();

  const init: any = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto)
  };

  if (jwt) {
    init.headers['Authorization'] = `Bearer ${jwt}`;
  }

  return fetch(url, init)
    .then(res => res.json() as Promise<T>);
}