import { ReadingListEnvelope } from './reading-list.envelope';
import { HateoasLink } from '../hateoas';

export interface ReadingListCollectionEnvelope {
  data: Array<ReadingListEnvelope>;
  _links: Array<HateoasLink>;
}