import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { SearchStoryDto, useSearchStories } from 'services/rest-api-service';
import { SearchBar } from 'features/story';
import { EntityList } from 'features/core/entity-list';
import { PageContainer } from 'features/core/page-container';

export const StoryListPage = () => {
  const [dto, setDto] = useState<SearchStoryDto>({ searchString: '', author: '' });

  const { data, isLoading, error } = useSearchStories(dto);

  const setSearchQuery = (query: string) => {
    debouncedFilter(dto, query);
  };

  const debouncedFilter = useCallback(
    debounce((dto: any, query: string) => {
      setDto({ ...dto, ...{ searchString: query } });
    }, 500),
    [],
  );

  return (
    <PageContainer>
      <SearchBar query={dto.searchString} setSearchQuery={setSearchQuery} />
      <EntityList items={data} isLoading={isLoading} error={error} />
    </PageContainer>
  );
};
