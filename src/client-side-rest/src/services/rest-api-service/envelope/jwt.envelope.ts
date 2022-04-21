import { HateoasLink } from 'services/rest-api-service';

export type JwtEnvelope = {
  access_token: string;
  _links: HateoasLink[]
}