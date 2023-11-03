import React, { useState, createContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from '@emotion/native';

export const FORMCONTROL_CONTEXT = createContext<FormControlContext>({});

export default function FormControl({
  children,
  variant = 'outlined',
  color = 'primary',
  error = false,
  disabled = false,
  style = [],
  fullWidth,
  ...props
}: FormControlProps) {
  const [piwiVariant, setPiwiVariant] = useState(variant);
  const [haveAdornments, setHaveAdornments] = useState(false);
  const [haveText, setHaveText] = useState(false);
  const [editing, setEditing] = useState(false);
  const [focus, setFocus] = useState(false);
  const [inputLabel, setInputLabel] = useState(false);

  return (
    <FORMCONTROL_CONTEXT.Provider
      value={{
        input: {
          haveText,
          setHaveText,
          editing,
          setEditing,
          focus,
          setFocus,
          haveAdornments,
          setHaveAdornments,
          setVariant: setPiwiVariant,
          inputLabel,
          setInputLabel,
        },
        variant: piwiVariant,
        color,
        error,
        disabled,
        fullWidth,
        ...props,
      }}
    >
      <FormControlRoot fullWidth style={style}>
        {children}
      </FormControlRoot>
    </FORMCONTROL_CONTEXT.Provider>
  );
}

const FormControlRoot = styled.View<FormControlProps>(
  ({ fullWidth, theme }) => ({
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 3,
    minWidth: 150,
    ...(fullWidth && { width: '100%' }),
  }),
);

export interface FormControlProps {
  children: React.ReactNode;
  variant?: 'standard' | 'filled' | 'outlined';
  error?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  fullWidth?: boolean;
}

interface FormControlContext
  extends Omit<FormControlProps, 'children' | 'style'> {
  input?: {
    haveText: boolean;
    setHaveText: React.Dispatch<React.SetStateAction<boolean>>;
    editing: boolean;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    focus: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>;
    haveAdornments: boolean;
    setHaveAdornments: React.Dispatch<React.SetStateAction<boolean>>;
    setVariant: React.Dispatch<
      React.SetStateAction<'standard' | 'filled' | 'outlined'>
    >;
    inputLabel: boolean;
    setInputLabel: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
