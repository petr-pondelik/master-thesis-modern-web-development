import { useCallback, useState } from 'react';
import { SearchStoryDto } from '../dto';
import debounce from 'lodash.debounce';
import { PageContainer, EntityList } from '../../common';
import { SearchBar } from '../component';
import { useSearchStories } from '../../api/queries';

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
