import { EntityCard, EntityCardHeader, EntityList, formatAuthor, Paths } from '../../common';
import { UpdateDialog } from './dialogs';
import { CardContent, Typography } from '@mui/material';
import { Shell_ReadingListCard } from './Shell_ReadingListCard';
import { ReadingList } from '../../graphql';

export const ReadingListView = (props: {
  readingList: ReadingList | undefined;
  isLoading: boolean;
  refetch: unknown;
}) => {
  const { readingList, isLoading, refetch } = props;

  if (isLoading || !readingList || !readingList.author) {
    return <Shell_ReadingListCard />;
  }

  return (
    <EntityCard>
      <EntityCardHeader
        title={formatAuthor(readingList.author)}
        subheader={readingList.createdAt}
        author={readingList.author}
        updateNode={<UpdateDialog readingList={readingList} refetch={refetch} />}
      />
      <CardContent>
        <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
          {readingList.title}
        </Typography>
        <EntityList
          items={readingList.stories}
          itemPath={Paths.stories()}
          isLoading={isLoading}
          refetch={refetch}
        />
      </CardContent>
    </EntityCard>
  );
};
