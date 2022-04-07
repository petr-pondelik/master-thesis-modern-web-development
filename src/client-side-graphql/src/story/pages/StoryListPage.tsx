import { useCallback, useState } from 'react';
import { SearchStoryDto } from '../dto';
import debounce from 'lodash.debounce';
import { EntityList, PageContainer } from '../../common';
import { SearchBar } from '../component';
import { useStoriesQuery } from '../../graphql/queries';

type SearchPageState = {
  dto: SearchStoryDto
}

export const StoryListPage = () => {
  const [state, setState] = useState<SearchPageState>({
    dto: { searchString: '', author: '' },
  });

  const { data, loading, error } = useStoriesQuery( { searchString: state.dto.searchString });

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
    <EntityList items={data?.stories} itemPath={'/stories'} isLoading={loading} error={error} />
  </PageContainer>;
};