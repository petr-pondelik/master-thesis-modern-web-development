import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Paths } from 'helpers';
import { useStoriesQuery } from 'services/graphql-api-service';
import { EntityList, ErrorPlaceholder, PageContainer } from 'features/core';
import { SearchBar } from 'features/story';

type SearchPageState = {
  dto: {
    searchString: string
  }
}

export const StoryListPage = () => {
  const [state, setState] = useState<SearchPageState>({
    dto: { searchString: '' },
  });

  const { data, loading, error } = useStoriesQuery( { searchString: state.dto.searchString });

  if (error) {
    return <ErrorPlaceholder />;
  }

  const setSearchQuery = (query: string) => {
    debouncedFilter(state, query);
  };

  const debouncedFilter = useCallback(
    debounce(
      (state: any, query: string) => {
          setState({ ...state, ...{ dto: { searchString: query } } });
      }
      , 500),
    []);

  return <PageContainer>
    <SearchBar
      query={state.dto.searchString}
      setSearchQuery={setSearchQuery}
    />
    <EntityList items={data?.stories} itemPath={Paths.stories()} isLoading={loading} />
  </PageContainer>;
};