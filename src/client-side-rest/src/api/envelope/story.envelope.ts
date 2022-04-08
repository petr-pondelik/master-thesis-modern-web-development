import { HateoasLink } from '../hateoas';
import { StoryEntity } from '../entity';

export interface StoryEnvelope extends StoryEntity {
  _links: Array<HateoasLink>;
}
