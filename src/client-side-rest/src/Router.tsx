import { Navigate, Route, Routes } from 'react-router-dom';
import { useUserStore } from 'store';
import App from 'features/core/app/App';
import {
  SignInPage,
  StoryListPage,
  StoryViewPage, UserReadingListCollectionPage, UserReadingListViewPage,
  UserStoryCollectionPage,
  UserStoryViewPage,
  UserViewPage,
} from 'pages';

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
        <Route path={'/users/:id/stories'} element={<UserStoryCollectionPage />} />
        <Route path={'/users/:userId/stories/:storyId'} element={<UserStoryViewPage />} />
        {user && (
          <>
            <Route path={'/users/:id/reading-lists'} element={<UserReadingListCollectionPage />} />
            <Route path={'/users/:userId/reading-lists/:readingListId'} element={<UserReadingListViewPage />} />
          </>
        )}
        <Route path={'*'} element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
};
