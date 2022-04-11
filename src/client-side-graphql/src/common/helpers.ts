import { StoryQueryAuthor } from '../graphql/queries';

export const formatAuthor = (author: StoryQueryAuthor | undefined) => {
  return author ? `${author.givenName} ${author.familyName}` : '...';
};

export const Paths = {
  stories: (id?: number) => { return id ? `/stories/${id}` : '/stories' },
  users: (id?: number) => {return id ? `/users/${id}` : '/users' },
  userStories: (id: number) => {return `/users/${id}/stories`},
  userReadingLists: (userId: number, readingListId?: number) => {
    return readingListId ? `/users/${userId}/reading-lists/${readingListId}` : `/users/${userId}/reading-lists`
  },
  signIn: '/sign-in'
}