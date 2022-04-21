import { HateoasLink, UserEntity } from 'services/rest-api-service';

export interface UserEnvelope extends UserEntity {
  _links: Array<HateoasLink>;
}
