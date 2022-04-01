import CustomTextField from './CustomTextField';
import { ValidationFunction } from '../../types';
import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { TextFieldPropsSizeOverrides } from '@mui/material';
import { useState } from 'react';

type EmailFieldProps = {
  name: string,
  label: React.ReactNode,
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
  defaultValue?: string,
  errorMsg?: string | undefined,
  updateParent(stateFragment: any, validationFragment: any): void,
}

export const EmailField = (props: EmailFieldProps) => {

  const [error, setError] = useState<string | undefined>(undefined);

  const errorMsg = 'Please enter valid e-mail address.';

  const validationFunction: ValidationFunction = (value: string): boolean => {
    return !!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  };

  const update = (stateFragment: any) => {
    const valid = validationFunction(stateFragment[props.name]);
    const validation: any = {};
    validation[props.name] = valid;
    if (!valid) {
      setError(errorMsg);
      props.updateParent(stateFragment, validation);
    } else {
      setError(undefined);
      props.updateParent(stateFragment, validation);
    }
  };

  return <CustomTextField
    type={'email'}
    name={props.name}
    label={props.label}
    size={props.size ?? 'medium'}
    defaultValue={props.defaultValue ?? ''}
    errorMsg={error}
    updateParent={update}
  />;

};