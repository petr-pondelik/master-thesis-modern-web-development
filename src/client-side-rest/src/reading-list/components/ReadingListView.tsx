import { findLink, ReadingListEnvelope } from '../../api';
import { EntityCard, EntityCardHeader } from '../../common';
import { UpdateDialog } from './dialogs';
import { CardContent, Typography } from '@mui/material';
import { Shell_ReadingListCard } from './Shell_ReadingListCard';

export const ReadingListView = (
  props: { readingList: ReadingListEnvelope | undefined, isLoading: boolean, refetch: unknown },
) => {
  const { readingList, isLoading, refetch } = props;

  if (isLoading || !readingList) {
    return <Shell_ReadingListCard/>
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
    <CardContent>
      <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
        {readingList.title}
      </Typography>
    </CardContent>
  </EntityCard>;
};