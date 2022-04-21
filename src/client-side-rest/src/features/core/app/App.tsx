import React  from 'react';
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'services/rest-api-service';
import { HeaderBar } from 'features/core/header-bar';

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
