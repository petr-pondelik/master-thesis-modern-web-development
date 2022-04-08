import { PartialUserEntity, UserEntity } from '../api/entity';

export const formatAuthor = (author: UserEntity | PartialUserEntity | undefined) => {
  return author ? `${author.givenName} ${author.familyName}` : '...';
};