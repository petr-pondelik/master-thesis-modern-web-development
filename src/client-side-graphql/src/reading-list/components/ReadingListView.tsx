import { EntityCard, EntityCardHeader, EntityList, formatAuthor, Paths } from '../../common';
import { UpdateDialog } from './dialogs';
import { CardContent, IconButton, Typography } from '@mui/material';
import { Shell_ReadingListCard } from './Shell_ReadingListCard';
import { UserReadingListQueryReadingList } from '../../graphql/queries';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteReadingListMutation, useRemoveStoryFromReadingListMutation } from '../../graphql/mutations';
import { apolloClient } from '../../graphql';
import { useNavigate } from 'react-router-dom';

export const ReadingListView = (props: {
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
    {
      userId: readingList.author.id,
      title: readingList.title,
    },
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
    console.log('TEST');
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
        updateNode={<UpdateDialog readingList={readingList} />}
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
