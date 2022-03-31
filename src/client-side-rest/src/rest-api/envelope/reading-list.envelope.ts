import { HateoasLink } from '../hateoas';

export type ReadingListEnvelope = {
  authorId: number;
  createdAt: Date;
  id: number;
  title: string;
  _links: Array<HateoasLink>;
}