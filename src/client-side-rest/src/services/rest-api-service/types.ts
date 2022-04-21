import { HttpMethod } from "types";

export type ErrorMessage = {
  statusCode: number;
  error?: string;
  message: string;
}

export type JwtPayload = {
  sub: number;
  email: string;
};

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
