import React, { useMemo } from 'react';
import Input, { InputProps } from './Input';
import FilledInput, { FilledInputProps } from './FilledInput';
import OutlinedInput, { OutlinedInputProps } from './OutlinedInput';
import InputLabel, { InputLabelProps as LabelProps } from './InputLabel';
import FormControl from './FormControl';
import FormHelperText from './FormHelperText';

export default function TextField({
  label,
  error = false,
  color = 'primary',
  variant = 'outlined',
  helperText = undefined,
  disabled = false,
  style = [],
  placeholder, // should never be used
  InputLabelProps,
  ...props
}: TextFieldProps) {
  const InputComponent = useMemo(() => {
    switch (variant) {
      case 'filled':
        return FilledInput;
      case 'outlined':
        return OutlinedInput;
      default:
        return Input;
    }
  }, [variant]);

  return (
    <FormControl color={color} variant={variant} error={error}>
      <InputLabel {...InputLabelProps} disabled={disabled}>
        {label}
      </InputLabel>
      <InputComponent {...props} disabled={disabled} />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

interface Props {
  label: string;
  placeholder?: never;
  helperText?: string;
  InputLabelProps?: LabelProps;
}

interface TextFieldInputProps extends Props, Omit<InputProps, 'placeholder'> {
  variant: 'standard';
}

interface TextFieldOutlinedInputProps
  extends Props,
    Omit<OutlinedInputProps, 'placeholder'> {
  variant: 'outlined';
}

interface TextFieldFilledInputProps
  extends Props,
    Omit<FilledInputProps, 'placeholder'> {
  variant: 'filled';
}

export type TextFieldProps =
  | TextFieldInputProps
  | TextFieldOutlinedInputProps
  | TextFieldFilledInputProps;
