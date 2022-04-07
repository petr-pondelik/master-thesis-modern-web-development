import { EntityList } from '../../common';
import { Fragment } from 'react';
import { StoryCreateDialog } from '../../story/component/dialogs/StoryCreateDialog';

export const StoryCollection = () => {
  // const { link } = props;
  // const { data: stories, isLoading, error, refetch } = useQuery<StoryCollectionEnvelope>(
  //   ['myStories'], () => HttpRequest<StoryCollectionEnvelope>(link.href, link.method),
  // );
  return <Fragment>
    {/*<EntityList items={stories} isLoading={isLoading} error={error} showHeader={false} />*/}
    {/*<StoryCreateDialog createLink={findLink(stories?._links ?? [], 'create')} refetch={refetch} />*/}
  </Fragment>;
};