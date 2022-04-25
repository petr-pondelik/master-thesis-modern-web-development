import { Paths } from 'helpers';
import { Fragment } from 'react';
import { UserStoriesQueryStory } from 'services/graphql-api-service';
import { EntityList } from 'features/core';
import { StoryCreateDialog } from 'features/story';

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
