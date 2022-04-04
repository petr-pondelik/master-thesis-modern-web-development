import { useCallback, useState } from 'react';
import { SearchStoryDto } from '../dto';
import debounce from 'lodash.debounce';
import {
  getRequest, InitData,
  StoryCollectionEnvelope,
} from '../../api';
import { HttpRequest } from '../../api/requests/http-request';
import { PageContainer, EntityList } from '../../common';
import { useQuery } from 'react-query';
import { SearchBar } from '../component';
import { LinkPair, useLinksStore } from '../../store';

type SearchPageState = {
  dto: SearchStoryDto
}

export const StoryListPage = () => {
  const addMore = useLinksStore(state => state.addMore);
  const findLink = useLinksStore(state => state.find);
  let searchLink = findLink('stories_search');

  const [state, setState] = useState<SearchPageState>({
    dto: { searchString: '', author: '' },
  });

  const { data: initData } = useQuery<InitData>(
    'init', () => getRequest<InitData>(''),
    {
      enabled: !searchLink,
    },
  );

  if (initData) {
    const pairs: LinkPair[] = [];
    for (const link of initData._links) {
      const _key = link.rel === 'search' ? `stories_${link.rel}` : link.rel;
      pairs.push({ key: _key, link: link });
    }
    addMore(pairs);
  }

  searchLink = findLink('stories_search');

  const fetchMethod = () => HttpRequest<StoryCollectionEnvelope, SearchStoryDto>(
    searchLink?.href ?? '', searchLink?.method ?? 'GET', state.dto,
  );
  const storiesResponse = useQuery<StoryCollectionEnvelope>(
    ['searchStories', state.dto],
    fetchMethod,
    { enabled: !!searchLink }
  );

  const setSearchQuery = (query: string) => {
    debouncedFilter(state, query);
  };

  const debouncedFilter = useCallback(
    debounce(
      (state: any, query: string) => {
          setState({ ...state, ...{ dto: { searchString: query, author: '' } } });
      }
      , 500),
    []);

  return <PageContainer>
    <SearchBar
      query={state.dto.searchString}
      setSearchQuery={setSearchQuery}
    />
    <EntityList items={storiesResponse.data} isLoading={storiesResponse.isLoading} error={storiesResponse.error} />
  </PageContainer>;
};

export default StoryListPage;