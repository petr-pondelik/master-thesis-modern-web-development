import { Typography } from '@mui/material';
import { PageContainer } from 'features/core';
import { SignInForm } from 'features/sign-in';

export const SignInPage = () => {
  return <PageContainer
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant={'h5'} style={{ margin: '2rem 0 4rem 0' }}>
      Sign In
    </Typography>
    <SignInForm />
  </PageContainer>;
};

export default SignInPage;