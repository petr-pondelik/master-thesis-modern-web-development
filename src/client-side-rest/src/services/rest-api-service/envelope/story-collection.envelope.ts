import { HateoasLink, StoryEnvelope } from 'services/rest-api-service';

export type StoryCollectionEnvelope = {
  data: Array<StoryEnvelope>;
  _links: Array<HateoasLink>;
}
