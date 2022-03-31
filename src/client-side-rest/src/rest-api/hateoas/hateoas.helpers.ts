import { HateoasLink, LinkRel } from './hateoas.types';

export const linkHref = (links: HateoasLink[], rel: LinkRel): string => {
  const link = links.find((link) => link.rel === rel);
  return link ? link.href : '#';
};
