import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { useUserStore } from 'stores';
import {
  SignInPage,
  StoryListPage,
  StoryViewPage, UserReadingListCollectionPage, UserReadingListViewPage,
  UserStoryCollectionPage,
  UserStoryViewPage,
  UserViewPage,
} from 'pages';
import { App } from 'features/core';

export const Router = () => {
  const user = useUserStore((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<StoryListPage />} />
        <Route path={'/sign-in'} element={<SignInPage />} />
        <Route path={'/stories'} element={<StoryListPage />} />
        <Route path={'/stories/:id'} element={<StoryViewPage />} />
        <Route path={'/users/:id'} element={<UserViewPage />} />
        {user && (
          <>
            <Route path={'/users/:id/stories'} element={<UserStoryCollectionPage />} />
            <Route path={'/users/:userId/stories/:storyId'} element={<UserStoryViewPage />} />
            <Route path={'/users/:id/reading-lists'} element={<UserReadingListCollectionPage />} />
            <Route path={'/users/:userId/reading-lists/:readingListId'} element={<UserReadingListViewPage />} />
          </>
        )}
        <Route path={'*'} element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
};
