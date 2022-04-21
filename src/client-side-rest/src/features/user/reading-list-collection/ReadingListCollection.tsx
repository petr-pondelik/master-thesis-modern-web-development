import { useQuery } from 'react-query';
import { Fragment } from 'react';
import { CreateDialog } from 'features/reading-list';
import { findLink, HateoasLink, HttpRequest, ReadingListCollectionEnvelope } from 'services/rest-api-service';
import { EntityList } from 'features/core/entity-list';

export const ReadingListCollection = (props: { link: HateoasLink }) => {
  const { link } = props;
  const { data: readingLists, isLoading, error, refetch } = useQuery<ReadingListCollectionEnvelope>(
    ['my-reading-lists'], () => HttpRequest<ReadingListCollectionEnvelope>(link.href, link.method),
  );
  return <Fragment>
    <EntityList items={readingLists} isLoading={isLoading} error={error} showHeader={false} />
    <CreateDialog createLink={findLink(readingLists?._links ?? [], 'create')} refetch={refetch}/>
  </Fragment>;
};