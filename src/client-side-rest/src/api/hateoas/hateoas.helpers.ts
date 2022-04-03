import { HateoasLink, LinkRel } from './hateoas.types';
import { HttpMethod } from '../../common';
import { getRequest } from '../requests';
import { postRequest } from '../requests';

export const linkToRequest = (link: HateoasLink) => {
  switch (link.method) {
    case 'GET':
      return getRequest;
    case 'POST':
      return postRequest;
    default:
      return getRequest;
  }
};

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
