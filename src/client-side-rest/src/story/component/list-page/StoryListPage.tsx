import { StoriesList } from './StoriesList';
import { useCallback, useEffect, useState } from 'react';
import { SearchStoryDto } from '../../dto';
import debounce from 'lodash.debounce';
import { findLink, HateoasLink, StoryCollectionEnvelope } from '../../../rest-api';
import { HttpRequest } from '../../../rest-api/http-request';
import { SearchBar } from './SearchBar';
import { PageContainer } from '../../../common';

type SearchPageState = {
  stories: StoryCollectionEnvelope
}

export const StoryListPage = () => {

  const searchQuery: SearchStoryDto = { searchString: '', author: '' };
  const [state, setState] = useState<SearchPageState>({ stories: { data: [], _links: [] } });
  let searchLink: HateoasLink | undefined = undefined;

  useEffect(() => {
    HttpRequest(window.location.pathname)
      .then(res => {
        searchLink = findLink(res._links, 'search');
        setState({ stories: res });
      });
  }, []);

  const setSearchQuery = (query: string) => {
    debouncedFilter(state, query);
  };

  const debouncedFilter = useCallback(
    debounce(
      (state, query) => {
        searchQuery.searchString = query;
        if (searchLink) {
          HttpRequest(searchLink.href, searchLink.method, searchQuery)
            .then(res => {
              setState({
                stories: res,
              });
            });
        }
      }
      , 500),
    []);

  return <PageContainer>
    <SearchBar
      query={searchQuery.searchString}
      setSearchQuery={setSearchQuery}
    />
    <StoriesList stories={state.stories} />
  </PageContainer>;
};

export default StoryListPage;