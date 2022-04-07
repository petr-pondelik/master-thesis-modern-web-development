import { ErrorPlaceholder, PageContainer } from '../../common';
import StoryView from '../../story/component/StoryView';

export const StoryViewPage = () => {
  // const resource = useResource(window.location.pathname);
  // const { data, isLoading, isError, refetch } = useQuery<StoryEnvelope>(
  //   resource.href, () => getRequest<StoryEnvelope>(resource.href),
  // );

  // if (isError) {
  //   return <ErrorPlaceholder />;
  // }

  return <PageContainer>
    {/*<StoryView story={data} isLoading={isLoading} refetch={refetch} />*/}
  </PageContainer>;
};