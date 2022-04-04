import { HateoasLink } from '../hateoas';
import { PartialUserEntity } from '../../entity';

export type ReadingListEnvelope = {
  authorId: number;
  createdAt: string;
  id: number;
  title: string;
  author?: PartialUserEntity;
  _links: Array<HateoasLink>;
}