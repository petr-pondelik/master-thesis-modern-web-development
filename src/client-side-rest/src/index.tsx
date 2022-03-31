import { render } from 'react-dom';
import React from 'react';
import './index.css';
import App from './app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import SearchPage from './story/component/search-page/SearchPage';
import UserPage from './user/components/UserPage';
import ViewPage from './story/component/view-page/ViewPage';
import Homepage from './home/components/Homepage';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Homepage />} />
        <Route path={'/users/:userId'} element={<UserPage />} />
        <Route path={'/stories/:storyId'} element={<ViewPage />} />
        <Route path={'/stories/search'} element={<SearchPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
