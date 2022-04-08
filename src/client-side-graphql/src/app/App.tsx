import React from 'react';
import HeaderBar from '../common/components/header-bar/HeaderBar';
import { Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <main>
        <HeaderBar />
        <Outlet />
      </main>
    </ApolloProvider>
  );
}

export default App;
