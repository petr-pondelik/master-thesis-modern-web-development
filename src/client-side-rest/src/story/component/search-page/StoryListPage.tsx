import { useCallback, useState } from 'react';
import { SearchStoryDto } from '../../dto';
import debounce from 'lodash.debounce';
import {
  createLink,
  HateoasLink,
  StoryCollectionEnvelope,
} from '../../../api';
import { HttpRequest } from '../../../api/requests/http-request';
import { SearchBar } from './SearchBar';
import { PageContainer, StoryList } from '../../../common';
import { useQuery } from 'react-query';

type SearchPageState = {
  searchLink: HateoasLink,
  dto: SearchStoryDto
}

export const StoryListPage = () => {

  const [state, setState] = useState<SearchPageState>({
    searchLink: createLink('POST', `${window.location.pathname}/search`, 'self'),
    dto: { searchString: '', author: '' },
  });

  const fetchMethod = () => HttpRequest<StoryCollectionEnvelope, SearchStoryDto>(
    state.searchLink.href, state.searchLink.method, state.dto,
  );
  const storiesResponse = useQuery<StoryCollectionEnvelope>([state.searchLink.href, state.dto], fetchMethod);

  const setSearchQuery = (query: string) => {
    debouncedFilter(state, query);
  };

  const debouncedFilter = useCallback(
    debounce(
      (state: any, query: string) => {
        if (state.searchLink) {
          setState({ ...state, ...{ dto: { searchString: query, author: '' } } });
        }
      }
      , 500),
    []);

  return <PageContainer>
    <SearchBar
      query={state.dto.searchString}
      setSearchQuery={setSearchQuery}
    />
    <StoryList stories={storiesResponse.data} isLoading={storiesResponse.isLoading} error={storiesResponse.error} />
  </PageContainer>;
};

export default StoryListPage;