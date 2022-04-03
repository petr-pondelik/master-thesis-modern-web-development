import { useCallback, useEffect, useState } from 'react';
import { SearchStoryDto } from '../../dto';
import debounce from 'lodash.debounce';
import { findLink, HateoasLink } from '../../../api';
import { HttpRequest } from '../../../api/http-request';
import { SearchBar } from './SearchBar';
import { PageContainer, StoriesList } from '../../../common';

type SearchPageState = {
  searchLink: HateoasLink | undefined,
  dto: SearchStoryDto
}

export const StoryListPage = () => {

  const [state, setState] = useState<SearchPageState>({
    searchLink: undefined,
    dto: { searchString: '', author: '' },
  });


  useEffect(() => {
    HttpRequest(window.location.pathname)
      .then(res => {
        const _searchLink = findLink(res._links, 'search');
        setState({ ...state, ['searchLink']: _searchLink });
      });
  }, []);

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
    <StoriesList fetchLink={state.searchLink} dto={state.dto} />
  </PageContainer>;
};

export default StoryListPage;