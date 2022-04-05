import { findLink, HateoasLink, HttpRequest, ReadingListCollectionEnvelope } from '../../api';
import { useQuery } from 'react-query';
import { Fragment } from 'react';
import { EntityList } from '../../common';
import { CreateDialog } from '../../reading-list/components';

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