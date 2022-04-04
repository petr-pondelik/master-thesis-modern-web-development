import { EntityList } from '../../common';
import { useQuery } from 'react-query';
import { findLink, HateoasLink, HttpRequest, StoryCollectionEnvelope } from '../../api';
import { Fragment } from 'react';
import { StoryCreateDialog } from '../../story/component/dialogs/StoryCreateDialog';

export const StoryCollection = (props: { link: HateoasLink }) => {
  const { link } = props;
  const { data: stories, isLoading, error, refetch } = useQuery<StoryCollectionEnvelope>(
    ['myStories'], () => HttpRequest<StoryCollectionEnvelope>(link.href, link.method),
  );
  return <Fragment>
    <EntityList items={stories} isLoading={isLoading} error={error} showHeader={false} />
    <StoryCreateDialog createLink={findLink(stories?._links ?? [], 'create')} refetch={refetch} />
  </Fragment>;
};