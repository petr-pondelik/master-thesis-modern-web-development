import { HateoasLink, LinkRel, LinkMethod } from './hateoas.types';

export const createLink = (rel: LinkRel, href: string, method: LinkMethod): HateoasLink => {
  return new HateoasLink(method, rel, href);
};
