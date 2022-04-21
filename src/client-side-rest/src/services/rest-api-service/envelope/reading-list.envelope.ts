import { HateoasLink, ReadingListEntity } from 'services/rest-api-service';

export interface ReadingListEnvelope extends ReadingListEntity {
  _links: Array<HateoasLink>;
}