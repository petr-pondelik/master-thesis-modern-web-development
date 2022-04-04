import { getRequest, StoryEnvelope } from '../../api';
import { ErrorPlaceholder } from '../../common';
import { useQuery } from 'react-query';
import { StoryCard } from './story-card';


export const StoryView = () => {
  const {data, isLoading, isError, refetch} = useQuery<StoryEnvelope>(
    window.location.pathname, () => getRequest<StoryEnvelope>(window.location.pathname)
  );

  if (isError) {
    return <ErrorPlaceholder />;
  }

  return <StoryCard story={data} isLoading={isLoading} refetch={refetch} />;
};

export default StoryView;