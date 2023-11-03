import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import styled from '@emotion/native';
import InputBase, { InputBaseProps } from './InputBase';
import { FORMCONTROL_CONTEXT } from './FormControl';
import { useBlurFocusHandlers } from '../root/hooks';

export default function OutlinedInput({ style, ...props }: OutlinedInputProps) {
  const { input, ...formControlProps } = useContext(FORMCONTROL_CONTEXT);
  const {
    color = 'primary',
    error = false,
    disabled = false,
    placeholder,
    ...rest
  } = _.defaults(props, formControlProps);
  const { inFocus, onBlur, onFocus, onChangeText } = useBlurFocusHandlers(
    rest.onFocus,
    rest.onBlur,
    rest.onChangeText,
  );

  useEffect(() => {
    if (input) {
      input.setVariant('outlined');
    }
  }, []);

  return (
    <OutlinedInputRoot
      color={color}
      error={error}
      disabled={disabled}
      focus={inFocus}
    >
      <InputBase
        {...rest}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
      />
      {placeholder && input && !input.inputLabel && !input.haveText && (
        <Placeholder error={error} disabled={disabled}>
          {placeholder}
        </Placeholder>
      )}
    </OutlinedInputRoot>
  );
}

export interface OutlinedInputProps extends InputBaseProps {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  error?: boolean;
  fullWidth?: boolean;
}

const OutlinedInputRoot = styled.View<{
  error: boolean;
  disabled: boolean;
  focus: boolean;
  color: NonNullable<OutlinedInputProps['color']>;
}>(({ theme, error, disabled, focus, color }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  borderRadius: 4,
  borderWidth: 1,
  borderColor: (() => {
    if (error) {
      return theme.palette.error.main;
    }
    if (disabled) {
      return theme.palette.text.disabled;
    }
    return theme.input.outlined.borderColor;
  })(),
  height: 50,
  paddingLeft: 14,
  paddingRight: 14,
  justifyContent: 'center',
  elevation: -1,
  zIndex: -1,
  ...(focus
    ? {
        borderWidth: 1.6,
        borderColor: error
          ? theme.palette.error.main
          : theme.palette[color].main,
      }
    : {}),
}));

const Placeholder = styled.Text<{ error: boolean; disabled: boolean }>(
  ({ theme, error, disabled }) => ({
    color: (() => {
      if (error) {
        return theme.palette.error.main;
      }
      if (disabled) {
        return theme.palette.text.disabled;
      }
      return theme.palette.text.secondary;
    })(),
    position: 'absolute',
    left: theme.spacing(2),
    fontWeight: 'normal',
    fontSize: theme.typography.h6.fontSize,
  }),
);
