export type LinkRel =
  | 'self'
  | 'author'
  | 'stories'
  | 'reading-lists'
  | 'detail'
  | 'create'
  | 'update'
  | 'delete'
  | 'addStory'
  | 'removeStory'
  | 'searchStories';

export type LinkMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HateoasLink = {
  method: LinkMethod;
  rel: LinkRel;
  href: string;
}
