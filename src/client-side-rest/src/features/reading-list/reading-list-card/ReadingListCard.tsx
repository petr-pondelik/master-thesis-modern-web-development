import { findLink, ReadingListEnvelope, StoryCollectionEnvelope } from 'services/rest-api-service';
import { CardContent, Typography } from '@mui/material';
import { EntityCard, EntityCardHeader } from 'features/core/entity-card';
import { UpdateDialog } from 'features/reading-list/dialogs';
import { EntityList } from 'features/core/entity-list';
import { Shell_ReadingListCard } from 'features/reading-list/reading-list-card/Shell_ReadingListCard';
import { useLinkQuery } from 'services/rest-api-service/queries';

export const ReadingListCard = (props: { readingList: ReadingListEnvelope | undefined; isLoading: boolean }) => {
  const { readingList, isLoading } = props;

  if (isLoading || !readingList) {
    return <Shell_ReadingListCard />;
  }

  const storiesLink = findLink(readingList._links, 'stories');
  const {
    data: stories,
    isLoading: storiesLoading,
    error: storiesError,
    refetch: storiesRefetch,
  } = useLinkQuery<StoryCollectionEnvelope>(['reading-list-stories', readingList.id], storiesLink);

  return (
    <EntityCard>
      <EntityCardHeader
        title={readingList.title}
        subheader={readingList.createdAt}
        author={readingList.author}
        updateNode={<UpdateDialog readingList={readingList} />}
        deleteLink={findLink(readingList._links, 'delete')}
        updateLink={findLink(readingList._links, 'update')}
        parentLink={findLink(readingList._links, 'parent')}
        authorLink={findLink(readingList._links, 'author')}
      />
      <CardContent>
        <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
          {readingList.title}
        </Typography>
        <EntityList items={stories} isLoading={storiesLoading} error={storiesError} refetch={storiesRefetch} />
      </CardContent>
    </EntityCard>
  );
};
