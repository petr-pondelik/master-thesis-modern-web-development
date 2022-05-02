import { Button, Grid } from '@mui/material';
import { CustomInput, MessageBox } from 'features/core';
import { useState } from 'react';
import { validateEmail, validatePassword } from 'validations';
import { useUserStore } from 'stores';
import { Navigate, useNavigate } from 'react-router-dom';
import { SignInContent, SignInData, useSignInMutation } from 'services/graphql-api-service';

const Messages = {
  invalidCredentials: 'Please enter valid credentials.',
};

export type SignInValidationState = {
  email: boolean;
  password: boolean;
};

export const SignInForm = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [dto, setDto] = useState<SignInContent>({ email: '', password: '' });
  const [validation, setValidation] = useState<SignInValidationState>({ email: false, password: false });
  const [enabled, setEnabled] = useState<boolean>(false);

  const signInCallback = (data: SignInData) => {
    setUser(data.signIn);
    navigate('/');
  };
  const [signIn, { error }] = useSignInMutation({ content: dto }, (data: SignInData) => signInCallback(data));

  if (user) {
    return <Navigate to="/" />;
  }

  const update = (dtoFragment: any, validationFragment: any) => {
    const newValidation: SignInValidationState = { ...validation, ...validationFragment };
    const newDto: SignInContent = { ...dto, ...dtoFragment };
    setDto(newDto);
    setValidation(newValidation);
    setEnabled(newValidation.password && newValidation.email);
  };

  const renderErrors = () => {
    if (error) {
      return <MessageBox msg={Messages.invalidCredentials} sx={{ color: 'error.main', marginTop: '1rem' }} />;
    }
  };

  return (
    <Grid container rowSpacing={3} direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <Grid container justifyContent="center" marginBottom={'1.25rem'}>
        <Grid item xs={10} md={6} lg={4}>
          <CustomInput
            type={'email'}
            name={'email'}
            label={'Email*'}
            errorMsg={'Please enter valid e-mail address.'}
            validationFunction={validateEmail}
            updateParent={(dtoFragment: any, validationFragment: any) => update(dtoFragment, validationFragment)}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" marginBottom={'2.5rem'}>
        <Grid item xs={10} md={6} lg={4}>
          <CustomInput
            type={'password'}
            name={'password'}
            label={'Password*'}
            errorMsg={'Please enter valid password.'}
            validationFunction={validatePassword}
            updateParent={(dtoFragment: any, validationFragment: any) => update(dtoFragment, validationFragment)}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={10} md={6} lg={4}>
          <Button variant="contained" sx={{ minWidth: '100%' }} disabled={!enabled} onClick={() => signIn()}>
            Sign In
          </Button>
          {renderErrors()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
