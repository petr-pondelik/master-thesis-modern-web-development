import { User } from '../graphql';

export const formatAuthor = (author: User | undefined) => {
  return author ? `${author.givenName} ${author.familyName}` : '...';
};

export const Paths = {
  stories: (id?: number) => { return id ? `/stories/${id}` : '/stories' },
  users: (id?: number) => {return id ? `/users/${id}` : '/users' },
  userStories: (id: number) => {return `/users/${id}/stories`},
  userReadingLists: (id: number) => {return `/users/${id}/reading-lists`},
  signIn: '/sign-in'
}