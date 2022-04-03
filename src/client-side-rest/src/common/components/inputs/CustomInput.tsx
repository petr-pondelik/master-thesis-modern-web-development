import { ChangeEvent, useState } from 'react';
import {OverridableStringUnion} from "@mui/types";
import { TextField, TextFieldPropsSizeOverrides } from '@mui/material';
import * as React from 'react';
import { ValidationFunction } from '../../types';

type CustomInputProps = {
  type?: React.InputHTMLAttributes<unknown>['type'],
  multiline?: boolean,
  name: string,
  label: React.ReactNode,
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
  defaultValue?: string|undefined,
  errorMsg?: string|undefined,
  validationFunction?: ValidationFunction,
  updateParent(stateFragment: any, validationFragment: any): void,
}

type CustomInputState = {
  value: any,
  error?: string
}

export const CustomInput = (props: CustomInputProps) => {

  const {type, multiline, name, label, size, defaultValue, errorMsg, validationFunction, updateParent} = props;
  const [state, setState] = useState<CustomInputState>({
    value: defaultValue,
    error: undefined
  });

  const defaultErrorMsg = 'Please enter text.';

  const defaultValidationFunction: ValidationFunction = (value: string): boolean => {
    return true;
  };

  const getErrorMsg = (): string => {
    return errorMsg ?? defaultErrorMsg;
  }

  const getValidationFunction = (): ValidationFunction => {
    return validationFunction ?? defaultValidationFunction;
  }

  const update = (event: ChangeEvent<HTMLInputElement>) => {
    const stateFragment: any = {};
    const val = event.target.value;
    stateFragment[name] = val;
    const valid = getValidationFunction()(stateFragment[name]);
    const validation: any = {};
    validation[name] = valid;
    if (!valid) {
      setState({
        ...state,
       ...{error: getErrorMsg(), value: val}
      });
      updateParent(stateFragment, validation);
    } else {
      setState({
        ...state,
        ...{error: undefined, value: val}
      });
      updateParent(stateFragment, validation);
    }
  };

  return <TextField
    variant={"standard"}
    type={type ?? 'text'}
    name={name}
    label={label}
    size={size ?? 'medium'}
    value={state.value ?? ''}
    onChange={update}
    error={!!state.error}
    helperText={state.error}
    multiline={multiline}
    fullWidth
  />
};

export default CustomInput;