import { useQuery } from 'react-query';
import { StoryEnvelope } from '../envelope';
import HttpRequest from '../http-request';

export const useStory = (id: number) => {
  return useQuery<StoryEnvelope>(
    ['story', id], () => HttpRequest<StoryEnvelope>(`/stories/${id}`),
  );
}