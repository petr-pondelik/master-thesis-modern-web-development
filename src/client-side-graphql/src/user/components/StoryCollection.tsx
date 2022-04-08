import { EntityList, Paths } from '../../common';
import { Fragment } from 'react';
import { StoryCreateDialog } from '../../story/component/dialogs/StoryCreateDialog';
import { UserStoriesQueryStory } from '../../graphql/queries';

type StoryCollectionProps = {
  stories: UserStoriesQueryStory[] | undefined;
  userId: number;
  isLoading: boolean;
}

export const StoryCollection = (props: StoryCollectionProps) => {
  const { stories, userId, isLoading } = props;
  return (
    <Fragment>
      <EntityList
        items={stories}
        itemPath={Paths.userStories(userId)}
        isLoading={isLoading}
        showHeader={false}
      />
      <StoryCreateDialog />
    </Fragment>
  );
};
