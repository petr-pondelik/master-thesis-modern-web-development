import { ResponseEnvelope } from './hateoas';
import ApiConfig from './api-config';

export async function getApiRoot(): Promise<ResponseEnvelope<null>> {
  const url = `${ApiConfig.host}`;
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json());
}