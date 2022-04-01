import { useLocation } from 'react-router-dom';
import CustomLink from '../CustomLink';
import { Button } from '@mui/material';
import * as React from 'react';


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