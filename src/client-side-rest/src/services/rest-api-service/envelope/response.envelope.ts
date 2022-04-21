import { HateoasLink } from 'services/rest-api-service';

export type ResponseEnvelope<T> = {
  data: T;
  _links: Array<HateoasLink>;
}
