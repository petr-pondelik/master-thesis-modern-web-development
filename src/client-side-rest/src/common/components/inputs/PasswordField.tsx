import CustomTextField from './CustomTextField';
import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { TextFieldPropsSizeOverrides } from '@mui/material';
import { ValidationFunction } from '../../types';
import { useState } from 'react';

type PasswordFieldProps = {
  name: string,
  label: React.ReactNode,
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
  defaultValue?: string,
  errorMsg?: string | undefined,
  updateParent(stateFragment: any, validationFragment: any): void,
}

export const PasswordField = (props: PasswordFieldProps) => {

  const [error, setError] = useState<string | undefined>(undefined);

  const errorMsg = 'Please enter valid password.';

  const validationFunction: ValidationFunction = (value: string): boolean => {
    return !!value.match(/^\w{8,}/);
  };

  const update = (stateFragment: any) => {
    const valid = validationFunction(stateFragment[props.name]);
    const validation: any = {};
    validation[props.name] = valid;
    if (!valid) {
      props.updateParent(stateFragment, validation);
      setError(errorMsg);
    } else {
      setError(undefined);
      props.updateParent(stateFragment, validation);
    }
  };

  return <CustomTextField
    type={'password'}
    name={props.name}
    label={props.label}
    size={props.size ?? 'medium'}
    defaultValue={props.defaultValue ?? ''}
    errorMsg={error}
    updateParent={update}
  />;
}

export default PasswordField;