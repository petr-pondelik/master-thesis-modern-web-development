import { Fragment } from 'react';
import { Paths } from 'helpers';
import { ReadingListCreateDialog } from 'features/reading-list';
import { EntityList } from 'features/core';
import { UserReadingListsQueryReadingList } from 'services/graphql-api-service';

type ReadingListCollectionProps = {
  readingLists: UserReadingListsQueryReadingList[] | undefined;
  userId: number;
  isLoading: boolean;
}

export const ReadingListCollection = (props: ReadingListCollectionProps) => {
  const { readingLists, userId, isLoading } = props;
  return (
    <Fragment>
      <EntityList
        items={readingLists}
        itemPath={Paths.userReadingLists(userId)}
        isLoading={isLoading}
        showHeader={false}
      />
      <ReadingListCreateDialog/>
    </Fragment>
  );
};
