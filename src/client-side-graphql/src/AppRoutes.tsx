import { useJwtStore } from './store';
import { Navigate, Route, Routes } from 'react-router-dom';
import App from './app/App';
import { StoryListPage, StoryViewPage } from './story';
import { SignInPage } from './sign-in';
import UserViewPage from './user/pages/UserViewPage';
import {
  ReadingListCollectionPage,
  ReadingListViewPage as UserReadingListViewPage,
  StoryCollectionPage,
  StoryViewPage as UserStoryViewPage,
} from './user';
import React from 'react';

export const AppRoutes = () => {
  const user = useJwtStore((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<StoryListPage />} />
        <Route path={'/sign-in'} element={<SignInPage />} />
        <Route path={'/stories'} element={<StoryListPage />} />
        <Route path={'/stories/:id'} element={<StoryViewPage />} />
        <Route path={'/users/:id'} element={<UserViewPage />} />
        <Route path={'/users/:id/stories'} element={<StoryCollectionPage />} />
        <Route path={'/users/:userId/stories/:storyId'} element={<UserStoryViewPage />} />
        {user && (
          <>
            <Route path={'/users/:id/reading-lists'} element={<ReadingListCollectionPage />} />
            <Route path={'/users/:userId/reading-lists/:readingListId'} element={<UserReadingListViewPage />} />
          </>
        )}
        <Route path={'*'} element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
};
