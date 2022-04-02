import { useJwtStore } from '../../../store';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomLink from '../CustomLink';
import { Button } from '@mui/material';

export const SessionControl = () => {

  const location = useLocation();
  const jwt = useJwtStore(state => state.jwt);
  const removeJwt = useJwtStore(state => state.removeJwt);
  const navigate = useNavigate();

  console.log(jwt);

  const logOut = () => {
    removeJwt();
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