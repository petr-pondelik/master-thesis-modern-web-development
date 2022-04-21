import { HateoasLink, ReadingListEnvelope } from 'services/rest-api-service';

export interface ReadingListCollectionEnvelope {
  data: Array<ReadingListEnvelope>;
  _links: Array<HateoasLink>;
}