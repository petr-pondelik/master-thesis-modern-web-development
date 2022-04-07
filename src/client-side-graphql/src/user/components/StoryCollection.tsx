import { EntityList, Paths } from '../../common';
import { Fragment } from 'react';
// import { StoryCreateDialog } from '../../story/component/dialogs/StoryCreateDialog';
import { Story } from '../../graphql';

interface IStoryCollectionProps {
  stories: Story[] | undefined;
  userId: number;
  isLoading: boolean;
}

export const StoryCollection = (props: IStoryCollectionProps) => {
  const { stories, userId, isLoading } = props;
  return (
    <Fragment>
      <EntityList
        items={stories}
        itemPath={Paths.userStories(userId)}
        isLoading={isLoading}
        showHeader={false}
      />
      {/*<StoryCreateDialog createLink={findLink(stories?._links ?? [], 'create')} refetch={refetch} />*/}
    </Fragment>
  );
};
