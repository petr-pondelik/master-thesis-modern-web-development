import { StoriesList } from './StoriesList';
import SearchBar from './SearchBar';
import { Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { SearchStoryDto } from '../../dto';
import debounce from 'lodash.debounce';
import { getApiRoot } from '../../../rest-api';
import { HateoasLink } from '../../../rest-api/hateoas';
import { StoryCollectionEnvelope } from '../../../rest-api/envelope';
import { HttpRequest } from '../../../rest-api/http-request';

type SearchPageState = {
  stories: StoryCollectionEnvelope
}

const SearchPage = () => {

  const searchQuery: SearchStoryDto = { searchString: '', author: '' };
  let searchLink: HateoasLink | undefined = undefined;

  const [state, setState] = useState<SearchPageState>(
    {
      stories: { data: [], _links: [] },
    },
  );

  useEffect(() => {
    getApiRoot().then((response) => {
        if (Array.isArray(response._links)) {
          searchLink = response._links.find((item) => item.rel === 'searchStories');
          if (searchLink) {
            HttpRequest(searchLink.method, searchLink.href, { searchString: '', author: '' })
              .then(res => {
                setState({ stories: res });
              });
          }
        }
      },
    );
  }, []);

  const setSearchQuery = (query: string) => {
    debouncedFilter(query);
  };

  const debouncedFilter = useCallback(
    debounce(
      (query) => {
        searchQuery.searchString = query;
        if (searchLink) {
          HttpRequest(searchLink.method, searchLink.href, searchQuery)
            .then(res => {
              setState({
                stories: res,
              });
            });
        }
      }
      , 500),
    []);

  return <Container style={{ padding: '1rem 0', width: '90%' }}>
    <SearchBar
      query={searchQuery.searchString}
      setSearchQuery={setSearchQuery}
    />
    <StoriesList stories={state.stories} />
  </Container>;
};

export default SearchPage;
