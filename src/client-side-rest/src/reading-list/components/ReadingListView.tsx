import { findLink, ReadingListEnvelope } from '../../api';
import { EntityCard, EntityCardHeader } from '../../common';
import { UpdateDialog } from './dialogs';

export const ReadingListView = (
  props: { readingList: ReadingListEnvelope | undefined, isLoading: boolean, refetch: unknown },
) => {
  const { readingList, isLoading, refetch } = props;

  if (isLoading || !readingList) {
    return <p>Loading...</p>
  }

  return <EntityCard>
    <EntityCardHeader
      title={readingList.title}
      subheader={readingList.createdAt}
      author={readingList.author}
      updateNode={<UpdateDialog readingList={readingList} refetch={refetch} />}
      deleteLink={findLink(readingList._links, 'delete')}
      updateLink={findLink(readingList._links, 'update')}
      parentLink={findLink(readingList._links, 'parent')}
      authorLink={findLink(readingList._links, 'author')}
    />
  </EntityCard>;
};