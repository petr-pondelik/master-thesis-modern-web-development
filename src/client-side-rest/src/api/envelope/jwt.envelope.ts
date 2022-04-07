import { HateoasLink } from '../hateoas';

export type JwtEnvelope = {
  access_token: string;
  _links: HateoasLink[]
}