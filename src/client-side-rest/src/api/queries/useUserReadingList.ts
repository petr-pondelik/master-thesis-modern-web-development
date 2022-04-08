import { useQuery } from 'react-query';
import { ReadingListEnvelope } from '../envelope';
import HttpRequest from '../http-request';

export const useUserReadingList = (userId: number, readingListTitle: string) => {
  return useQuery<ReadingListEnvelope>(['readingList', userId, readingListTitle], () =>
    HttpRequest<ReadingListEnvelope>(`/users/${userId}/reading-lists/${readingListTitle}`),
  );
}