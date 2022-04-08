import { HateoasLink } from '../hateoas';
import { UserEntity } from '../entity';

export interface UserEnvelope extends UserEntity {
  _links: Array<HateoasLink>;
}
