import React  from 'react';
import HeaderBar from '../common/components/header-bar/HeaderBar';
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../api';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <main>
      <HeaderBar />
      <Outlet />
    </main>
    </QueryClientProvider>
  );
}

export default App;
