import { useUserStore } from 'store';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { CustomLink } from 'features/core/custom-link';

export const SessionControl = () => {

  const location = useLocation();
  const jwt = useUserStore(state => state.jwt);
  const removeUser = useUserStore(state => state.removeUser);
  const navigate = useNavigate();

  const logOut = () => {
    removeUser();
    navigate('/');
  }

  if (jwt === null) {
    if (location.pathname === '/sign-in') {
      return null;
    }
    return <CustomLink to={'/sign-in'} customStyles={{ color: '#fff' }}>
      <Button color='inherit'>Login</Button>
    </CustomLink>;
  } else {
    return <Button color='inherit' onClick={logOut}>Logout</Button>
  }

};