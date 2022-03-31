import { StoryEnvelope } from './story.envelope';
import { HateoasLink } from '../hateoas';

export type StoryCollectionEnvelope = {
  data: Array<StoryEnvelope>;
  _links: Array<HateoasLink>;
}
