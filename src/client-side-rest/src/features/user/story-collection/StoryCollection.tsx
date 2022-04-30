import { findLink, HateoasLink, StoryCollectionEnvelope } from 'services/rest-api-service';
import { Fragment } from 'react';
import { EntityList } from 'features/core/entity-list';
import { StoryCreateDialog } from 'features/story';
import { useLinkQuery } from 'services/rest-api-service/queries';

export const StoryCollection = (props: { link: HateoasLink }) => {
  const { link } = props;
  const { data: stories, isLoading, error, refetch } = useLinkQuery<StoryCollectionEnvelope>(
    ['myStories'], link,
  );
  return <Fragment>
    <EntityList items={stories} isLoading={isLoading} error={error} showHeader={false} />
    <StoryCreateDialog createLink={findLink(stories?._links ?? [], 'create')} refetch={refetch} />
  </Fragment>;
};