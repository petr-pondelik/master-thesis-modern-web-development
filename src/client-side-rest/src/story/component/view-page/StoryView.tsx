import { StoryEnvelope } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import { ErrorPlaceholder } from '../../../common';
import { StoryCard } from './story-card';


export const StoryView = () => {

  const { response: story, loading } = useFetch<StoryEnvelope>(true, window.location.pathname);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (story) {
    return <StoryCard story={story} />
  }

  return <ErrorPlaceholder />;
};

export default StoryView;