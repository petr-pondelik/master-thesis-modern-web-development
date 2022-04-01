import { Button, Grid } from '@mui/material';
import { EmailField, PasswordField } from '../common';
import { SignInDto } from './dto';
import { useState } from 'react';
import { HttpRequest } from '../rest-api';

const Messages = {
  invalidCredentials: 'Please enter valid credentials.',
};

export type SignInValidationState = {
  email: boolean,
  password: boolean
};

export const SignInForm = () => {

  const [dto, setDto] = useState<SignInDto>({ email: '', password: '' });
  const [validation, setValidation] = useState<SignInValidationState>({ email: false, password: false });
  const [enabled, setEnabled] = useState<boolean>(false);

  const update = (dtoFragment: any, validationFragment: any) => {
    const newValidation: SignInValidationState = { ...validation, ...validationFragment };
    if (newValidation.email && newValidation.password) {
      const newDto: SignInDto = { ...dto, ...dtoFragment };
      setDto(newDto);
    }
    setValidation(newValidation);
    setEnabled(newValidation.password && newValidation.email);
  };

  const signIn = () => {
    HttpRequest('/auth/sign-in', 'POST', dto)
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <Grid container rowSpacing={3} direction={'column'}
               justifyContent={'center'}
               alignItems={'center'}>
    <Grid container
          justifyContent='center'
          marginBottom={'1.25rem'}
    >
      <Grid item xs={10} md={6} lg={4}>
        <EmailField name={'email'} label={'Email*'}
                    updateParent={
                      (dtoFragment: any, validationFragment: any) => update(dtoFragment, validationFragment)
                    }
        />
      </Grid>
    </Grid>
    <Grid container
          justifyContent='center'
          marginBottom={'2.5rem'}
    >
      <Grid item xs={10} md={6} lg={4}>
        <PasswordField name={'password'} label={'Password*'}
                       updateParent={
                         (dtoFragment: any, validationFragment: any) => update(dtoFragment, validationFragment)
                       }
        />
      </Grid>
    </Grid>
    <Grid container
          justifyContent='center'>
      <Grid item xs={10} md={6} lg={4}>
        <Button variant='contained' sx={{ minWidth: '100%' }} disabled={!enabled} onClick={signIn}>
          Sign In
        </Button>
      </Grid>
    </Grid>
  </Grid>;
};

export default SignInForm;