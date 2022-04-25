import { formatAuthor, Paths } from 'helpers';
import { EntityCard, EntityCardHeader, EntityList } from 'features/core';
import { CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import {
  apolloClient,
  useDeleteReadingListMutation, useRemoveStoryFromReadingListMutation,
  UserReadingListQueryReadingList,
} from 'services/graphql-api-service';
import { ReadingListUpdateDialog, Shell_ReadingListCard } from 'features/reading-list';

export const ReadingListCard = (props: {
  readingList: UserReadingListQueryReadingList | undefined;
  deleteBacklink?: string;
  isLoading: boolean;
}) => {
  const { readingList, deleteBacklink, isLoading } = props;

  if (isLoading || !readingList) {
    return <Shell_ReadingListCard />;
  }

  const navigate = useNavigate();

  const deleteCallback = () => {
    navigate(deleteBacklink ?? '');
    apolloClient.refetchQueries({
      include: ['UserReadingLists'],
    });
  };

  const [deleteReadingList] = useDeleteReadingListMutation(
    { id: readingList.id, },
    deleteCallback,
  );

  const deleteNode = () => {
    if (!deleteBacklink) {
      return null;
    }
    return (
      <IconButton aria-label="settings" onClick={() => deleteReadingList()}>
        <DeleteIcon />
      </IconButton>
    );
  };

  const removeStoryCallback = () => {
    apolloClient.refetchQueries({
      include: ['UserReadingList'],
    });
  };

  const [removeStory] = useRemoveStoryFromReadingListMutation(
    {
      readingListId: readingList.id,
      id: -1,
    },
    removeStoryCallback,
  );

  return (
    <EntityCard>
      <EntityCardHeader
        title={formatAuthor(readingList.author)}
        subheader={readingList.createdAt}
        author={readingList.author}
        updateNode={<ReadingListUpdateDialog readingList={readingList} />}
        deleteNode={deleteNode()}
      />
      <CardContent>
        <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
          {readingList.title}
        </Typography>
        <EntityList
          items={readingList.stories}
          itemPath={Paths.stories()}
          deleteMutation={removeStory}
          isLoading={isLoading}
        />
      </CardContent>
    </EntityCard>
  );
};
