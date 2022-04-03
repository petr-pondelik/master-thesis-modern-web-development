import { HttpMethod } from '../../common';

export type LinkRel =
  | 'self'
  | 'parent'
  | 'author'
  | 'stories'
  | 'reading-lists'
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'addStory'
  | 'removeStory'
  | 'search';

export type HateoasLink = {
  method: HttpMethod;
  rel: LinkRel;
  href: string;
}
