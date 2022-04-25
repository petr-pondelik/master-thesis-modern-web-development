import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Paths } from 'helpers';
import { useUserStore } from 'store';
import { CustomLink } from 'features/core';

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
    if (location.pathname === Paths.signIn) {
      return null;
    }
    return <CustomLink to={Paths.signIn} customStyles={{ color: '#fff' }}>
      <Button color='inherit'>Login</Button>
    </CustomLink>;
  } else {
    return <Button color='inherit' onClick={logOut}>Logout</Button>
  }

};