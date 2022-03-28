import { Link } from './hateoas.types';

export const addEntityLinks = (entity: any, links: Array<Link>) => {
  entity.links = links;
  return entity;
}

export const addCollectionLinks = (envelope: any, links: Array<Link>) => {
  envelope.links = links;
  return envelope;
};

// export const addCollectionLinks = (collection: Array<any>, links: Array<Link>) => {
//   for (const l of links) {
//     collection.push(l)
//   }
//   return collection;
// };