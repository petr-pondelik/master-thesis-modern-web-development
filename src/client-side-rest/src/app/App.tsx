import React  from 'react';
import HeaderBar from '../common/components/header-bar/HeaderBar';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main>
      <HeaderBar />
      <Outlet />
    </main>
  );
}

export default App;
