import { HateoasLink } from '../hateoas';
import { ReadingListEntity } from '../entity';

export interface ReadingListEnvelope extends ReadingListEntity {
  _links: Array<HateoasLink>;
}