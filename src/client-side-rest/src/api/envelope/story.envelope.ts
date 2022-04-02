import { HateoasLink } from '../hateoas';
import { PartialUserEntity } from '../../entity';

export type StoryEnvelope = {
  authorId: number;
  content: string;
  createdAt: Date;
  description: string;
  id: number;
  title: string;
  author?: PartialUserEntity;
  _links: Array<HateoasLink>;
}
