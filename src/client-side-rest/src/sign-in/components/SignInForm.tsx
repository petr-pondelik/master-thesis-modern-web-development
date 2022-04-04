import { Button, Grid } from '@mui/material';
import { CustomInput, MessageBox } from '../../common';
import { SignInDto } from '../dto';
import { useEffect, useState } from 'react';
import { useSignIn } from '../../hooks/useSignIn';
import { validateEmail, validatePassword } from '../../common/validation';

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
  const [performSignIn, setPerformSignIn] = useState<boolean>(false);

  const { authorized } = useSignIn(performSignIn, dto);

  useEffect(() => {
    setPerformSignIn(false);
  }, [authorized]);

  const update = (dtoFragment: any, validationFragment: any) => {
    const newValidation: SignInValidationState = { ...validation, ...validationFragment };
    const newDto: SignInDto = { ...dto, ...dtoFragment };
    setDto(newDto);
    setValidation(newValidation);
    setEnabled(newValidation.password && newValidation.email);
  };

  const renderErrors = () => {
    if (authorized === false) {
      return <MessageBox
        msg={Messages.invalidCredentials}
        sx={{ color: 'error.main', marginTop: '1rem' }}
      />;
    }
  };

  return <Grid container rowSpacing={3} direction={'column'}
               justifyContent={'center'}
               alignItems={'center'}>
    <Grid container
          justifyContent='center'
          marginBottom={'1.25rem'}
    >
      <Grid item xs={10} md={6} lg={4}>
        <CustomInput
          type={'email'}
          name={'email'}
          label={'Email*'}
          errorMsg={'Please enter valid e-mail address.'}
          validationFunction={validateEmail}
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
        <CustomInput
          type={'password'}
          name={'password'}
          label={'Password*'}
          errorMsg={'Please enter valid password.'}
          validationFunction={validatePassword}
          updateParent={
            (dtoFragment: any, validationFragment: any) => update(dtoFragment, validationFragment)
          }
        />
      </Grid>
    </Grid>
    <Grid container
          justifyContent='center'>
      <Grid item xs={10} md={6} lg={4}>
        <Button variant='contained' sx={{ minWidth: '100%' }} disabled={!enabled}
                onClick={() => setPerformSignIn(true)}>
          Sign In
        </Button>
        {renderErrors()}
      </Grid>
    </Grid>
  </Grid>;
};

export default SignInForm;