import { ChangeEvent } from 'react';
import {OverridableStringUnion} from "@mui/types";
import { TextField, TextFieldPropsSizeOverrides } from '@mui/material';
import * as React from 'react';

type CustomTextFieldProps = {
  type?: React.InputHTMLAttributes<unknown>['type'],
  name: string,
  label: React.ReactNode,
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
  defaultValue?: string|null,
  errorMsg?: string|null,
  updateParent(stateFragment: any): void,
}

export const CustomTextField = (props: CustomTextFieldProps) => {
  const update = (event: ChangeEvent<HTMLInputElement>) => {
    const key: string = event.currentTarget.name;
    const newVal: string = event.currentTarget.value;
    const stateFragment: any = {};
    stateFragment[key] = newVal;
    props.updateParent(stateFragment);
  }

  return <TextField
    variant={"standard"}
    type={props.type ?? 'text'}
    name={props.name}
    label={props.label}
    size={props.size ?? 'medium'}
    defaultValue={props.defaultValue ?? undefined}
    onChange={update}
    error={!!props.errorMsg}
    helperText={props.errorMsg}
    fullWidth
  />
};

export default CustomTextField;