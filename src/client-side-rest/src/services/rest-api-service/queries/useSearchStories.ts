import { useQuery } from 'react-query';
import { StoryCollectionEnvelope } from '../envelope';
import { HttpRequest } from 'helpers';
import { SearchStoryDto } from 'services/rest-api-service';

export const useSearchStories = (dto: SearchStoryDto) => {
  const fetcher = () => HttpRequest<StoryCollectionEnvelope, SearchStoryDto>(
      '/stories/search',
      'POST',
      dto,
    );
  return useQuery<StoryCollectionEnvelope>(['searchStories', dto], fetcher);
}