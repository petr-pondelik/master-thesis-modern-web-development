import { HateoasLink } from './hateoas';

export type JwtPayload = {
  sub: number;
  email: string;
  _links: HateoasLink[]
};
