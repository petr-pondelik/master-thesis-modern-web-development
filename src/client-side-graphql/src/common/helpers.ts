import { PartialUserEntity, UserEntity } from '../entity';

export const formatAuthor = (author: UserEntity | PartialUserEntity | undefined) => {
  return author ? `${author.givenName} ${author.familyName}` : '...';
};