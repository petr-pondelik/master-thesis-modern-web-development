import { Fragment } from 'react';
import { CreateDialog } from 'features/reading-list';
import { findLink, HateoasLink, ReadingListCollectionEnvelope } from 'services/rest-api-service';
import { EntityList } from 'features/core/entity-list';
import { useLinkQuery } from 'services/rest-api-service/queries';

export const ReadingListCollection = (props: { link: HateoasLink }) => {
  const { link } = props;
  const { data: readingLists, isLoading, error, refetch } = useLinkQuery<ReadingListCollectionEnvelope>(
    ['my-reading-lists'], link,
  );
  return <Fragment>
    <EntityList items={readingLists} isLoading={isLoading} error={error} showHeader={false} />
    <CreateDialog createLink={findLink(readingLists?._links ?? [], 'create')} refetch={refetch}/>
  </Fragment>;
};