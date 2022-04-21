import { useQuery } from 'react-query';
import { findLink, HateoasLink, HttpRequest, StoryCollectionEnvelope } from 'services/rest-api-service';
import { Fragment } from 'react';
import { EntityList } from 'features/core/entity-list';
import { StoryCreateDialog } from '../../story';

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