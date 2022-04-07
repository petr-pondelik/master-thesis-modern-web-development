import { Fragment } from 'react';
import { CreateDialog } from '../../reading-list/components';
import { ReadingList } from '../../graphql';
import { EntityList, Paths } from '../../common';

interface IReadingListCollectionProps {
  readingLists: ReadingList[] | undefined;
  userId: number;
  isLoading: boolean;
}

export const ReadingListCollection = (props: IReadingListCollectionProps) => {
  const { readingLists, userId, isLoading } = props;
  return (
    <Fragment>
      <EntityList
        items={readingLists}
        itemPath={Paths.userReadingLists(userId)}
        isLoading={isLoading}
        showHeader={false}
      />
      {/*<CreateDialog createLink={findLink(readingLists?._links ?? [], 'create')} refetch={refetch}/>*/}
    </Fragment>
  );
};
