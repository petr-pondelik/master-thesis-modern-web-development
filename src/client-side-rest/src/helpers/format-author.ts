import { PartialUserEntity, UserEntity } from '../services/rest-api-service';

export const formatAuthor = (author: UserEntity | PartialUserEntity | undefined) => {
  return author ? `${author.givenName} ${author.familyName}` : '...';
};