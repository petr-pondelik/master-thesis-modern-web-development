import { Link, LinkRel, LinkMethod } from './hateoas.types';

export const createLink = (rel: LinkRel, href: string, method: LinkMethod): Link => {
  return {
    method: method,
    rel: rel,
    href: href,
  };
};
