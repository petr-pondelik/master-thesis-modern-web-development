import { HateoasLink } from '../hateoas';

export type ResponseEnvelope<T> = {
  data: T;
  _links: Array<HateoasLink>;
}
