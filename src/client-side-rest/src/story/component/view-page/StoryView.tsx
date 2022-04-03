import { getRequest, StoryEnvelope } from '../../../api';
import { ErrorPlaceholder } from '../../../common';
import { StoryCard } from './story-card';
import { useQuery } from 'react-query';


export const StoryView = () => {
  const response = useQuery<StoryEnvelope>(
    window.location.pathname, () => getRequest<StoryEnvelope>(window.location.pathname)
  );

  if (response.isError) {
    return <ErrorPlaceholder />;
  }

  return <StoryCard story={response.data} isLoading={response.isLoading} />;
};

export default StoryView;