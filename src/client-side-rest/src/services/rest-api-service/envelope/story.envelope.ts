import { HateoasLink, StoryEntity } from 'services/rest-api-service';

export interface StoryEnvelope extends StoryEntity {
  _links: Array<HateoasLink>;
}
