import { HateoasLink } from './hateoas.types';

export const addLinks = (entity: any, links: Array<HateoasLink>) => {
  entity.links = links;
  return entity;
}
