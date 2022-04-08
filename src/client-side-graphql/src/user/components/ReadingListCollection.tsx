import { Fragment } from 'react';
import { CreateDialog } from '../../reading-list/components';
import { EntityList, Paths } from '../../common';
import { UserReadingListsQueryReadingList } from '../../graphql/queries';

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
      <CreateDialog/>
    </Fragment>
  );
};
