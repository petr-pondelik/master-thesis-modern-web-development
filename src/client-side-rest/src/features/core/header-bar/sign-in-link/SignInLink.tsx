import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import * as React from 'react';
import { CustomLink } from 'features/core/custom-link';

export const SignInLink = () => {
  const location = useLocation();
  if (location.pathname === '/sign-in') {
    return null;
  }
  return <CustomLink to={'/sign-in'} customStyles={{ color: '#fff' }}>
    <Button color='inherit'>Login</Button>
  </CustomLink>;
};

export default SignInLink;