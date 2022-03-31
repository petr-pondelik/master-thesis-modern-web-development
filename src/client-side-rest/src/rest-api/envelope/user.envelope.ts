import { HateoasLink } from '../hateoas';

export type UserEnvelope = {
  createdAt: Date;
  email: string;
  familyName: string;
  givenName: string;
  id: number;
  password: string;
  profileDescription: string;
  _links: Array<HateoasLink>;
}
