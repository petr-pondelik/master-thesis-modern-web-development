import ApiConfig from './api-config';
import { LinkMethod } from './hateoas';

export async function HttpRequest(_method: LinkMethod = 'GET', urlTail = '', dto: object) {
  const url = `${ApiConfig.path()}${urlTail}`;

  const defaultInit = {
    method: _method,
    headers: {
    'Content-Type': 'application/json',
    }
  };

  let customInit = {};

  switch (_method) {
    case 'POST':
      customInit = {
        body: JSON.stringify(dto)
      }
  }

  const init = {...defaultInit, ...customInit};

  return await fetch(url, init).then(res => res.json());
}