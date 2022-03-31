import { ReadingListEnvelope } from './reading-list.envelope';
import { HateoasLink } from '../hateoas';

export type ReadingListCollectionEnvelope = {
  data: Array<ReadingListEnvelope>;
  _links: Array<HateoasLink>;
}