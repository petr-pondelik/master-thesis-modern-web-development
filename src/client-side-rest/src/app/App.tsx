import React  from 'react';
import HeaderBar from '../common/components/header-bar/HeaderBar';
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

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
