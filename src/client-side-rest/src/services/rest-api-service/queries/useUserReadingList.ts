import { useQuery } from 'react-query';
import { ReadingListEnvelope } from '../envelope';
import { HttpRequest } from 'helpers';

export const useUserReadingList = (userId: number, readingListId: number) => {
  return useQuery<ReadingListEnvelope>(['readingList', userId, readingListId], () =>
    HttpRequest<ReadingListEnvelope>(`/users/${userId}/reading-lists/${readingListId}`),
  );
}