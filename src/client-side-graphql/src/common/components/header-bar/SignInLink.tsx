import { useLocation } from 'react-router-dom';
import CustomLink from '../CustomLink';
import { Button } from '@mui/material';
import * as React from 'react';
import { Paths } from '../../helpers';

export const SignInLink = () => {
  const location = useLocation();
  if (location.pathname === '/sign-in') {
    return null;
  }
  return <CustomLink to={Paths.signIn} customStyles={{ color: '#fff' }}>
    <Button color='inherit'>Login</Button>
  </CustomLink>;
};

export default SignInLink;