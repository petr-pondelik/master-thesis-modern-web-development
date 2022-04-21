import { HttpMethod } from 'types';
import { HateoasLink, LinkRel } from 'services/rest-api-service/types';

export const createLink = (_method: HttpMethod, _href: string, _rel: LinkRel): HateoasLink => {
  return {
    method: _method,
    href: _href,
    rel: _rel,
  };
};

export const findLink = (links: HateoasLink[], rel: LinkRel): HateoasLink => {
  const link = links.find((link) => link.rel === rel);
  if (!link) {
    return createLink('GET', '', 'self');
  }
  return link;
};

export const linkHref = (links: HateoasLink[], rel: LinkRel): string => {
  const link = links.find((link) => link.rel === rel);
  return link ? link.href : '#';
};
