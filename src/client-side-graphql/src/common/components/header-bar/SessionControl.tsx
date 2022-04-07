import { useJwtStore } from '../../../store';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomLink from '../CustomLink';
import { Button } from '@mui/material';
import { Paths } from '../../helpers';

export const SessionControl = () => {

  const location = useLocation();
  const jwt = useJwtStore(state => state.jwt);
  const removeUser = useJwtStore(state => state.removeUser);
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