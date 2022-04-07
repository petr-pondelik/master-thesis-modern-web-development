import { EntityCard, EntityCardHeader, EntityList } from '../../common';
import { UpdateDialog } from './dialogs';
import { CardContent, Typography } from '@mui/material';
import { Shell_ReadingListCard } from './Shell_ReadingListCard';

export const ReadingListView = (
  props: { readingList: any | undefined, isLoading: boolean, refetch: unknown },
) => {
  const { readingList, isLoading, refetch } = props;

  if (isLoading || !readingList) {
    return <Shell_ReadingListCard />;
  }

  // const fetchMethod = () => HttpRequest<StoryCollectionEnvelope>(storiesLink.href, storiesLink.method);
  // const { data: stories, isLoading: storiesLoading, error: storiesError, refetch: storiesRefetch }
  //   = useQuery<StoryCollectionEnvelope>(
  //   storiesLink.href, fetchMethod,
  // );

  return <EntityCard>
    <EntityCardHeader
      title={readingList.title}
      subheader={readingList.createdAt}
      author={readingList.author}
      updateNode={<UpdateDialog readingList={readingList} refetch={refetch} />}
    />
    <CardContent>
      <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
        {readingList.title}
      </Typography>
      {/*<EntityList items={stories} isLoading={storiesLoading} error={storiesError} refetch={storiesRefetch} />*/}
    </CardContent>
  </EntityCard>;
};