import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import styled from '@emotion/native';
import InputBase, { InputBaseProps } from './InputBase';
import ExpandibleBottomBar from '../root/ExpandibleBottomBar';
import { FORMCONTROL_CONTEXT } from './FormControl';
import { useBlurFocusHandlers } from '../root/hooks';

export default function Input({ style, ...props }: InputProps) {
  const { input, ...formControlProps } = useContext(FORMCONTROL_CONTEXT);
  const {
    color = 'primary',
    error = false,
    disabled = false,
    ...rest
  } = _.defaults(props, formControlProps);
  const { inFocus, onBlur, onFocus, onChangeText } = useBlurFocusHandlers(
    rest.onFocus,
    rest.onBlur,
    rest.onChangeText,
  );

  useEffect(() => {
    if (input) {
      input.setVariant('standard');
    }
  }, []);

  return (
    <InputRoot style={style} error={error}>
      <InputBase
        {...rest}
        onChangeText={onChangeText}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <PiwiBar
        whithoutAnim={!error}
        color={color}
        show={inFocus}
        error={error}
        disabled={disabled}
      />
    </InputRoot>
  );
}

export interface InputProps extends InputBaseProps {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  error?: boolean;
  fullWidth?: boolean;
}

const InputRoot = styled.View<{ error: boolean }>(({ theme, error }) => ({
  position: 'relative',
  borderBottomWidth: error ? 2 : 1,
  borderBottomColor: error
    ? theme.palette.error.main
    : theme.input.standard.borderColor, // theme.palette[color].main
  justifyContent: 'center',
}));

const PiwiBar = styled(ExpandibleBottomBar)({
  position: 'absolute',
  bottom: 0,
});
