export type LinkRel =
  | 'self'
  | 'author'
  | 'articles'
  | 'detail'
  | 'create'
  | 'update'
  | 'delete'
  | 'addArticle'
  | 'removeArticle';

export type LinkMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Link = {
  rel: LinkRel;
  href: string;
  method: LinkMethod;
};
