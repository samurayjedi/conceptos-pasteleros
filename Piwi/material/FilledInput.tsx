import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import styled from '@emotion/native';
import InputBase, { InputBaseProps } from './InputBase';
import ExpandibleBottomBar from '../root/ExpandibleBottomBar';
import { FORMCONTROL_CONTEXT } from './FormControl';
import { useBlurFocusHandlers } from '../root/hooks';

export default function FilledInput({ style, ...props }: FilledInputProps) {
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
      input.setVariant('filled');
    }
  }, []);

  return (
    <FilledInputRoot>
      <PiwiInputBase
        {...rest}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
      />
      <PiwiBar
        whithoutAnim={!error}
        color={color}
        show={inFocus}
        error={error}
        disabled={disabled}
      />
    </FilledInputRoot>
  );
}

export interface FilledInputProps extends InputBaseProps {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  error?: boolean;
  fullWidth?: boolean;
}

const FilledInputRoot = styled.View(({ theme }) => ({
  position: 'relative',
  height: 50,
  backgroundColor: theme.input.filled.background,
  justifyContent: 'center',
}));

const PiwiInputBase = styled(InputBase)(({ theme }) => ({
  position: 'relative',
  top: 8,
  paddingLeft: 12,
  paddingRight: 12,
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
}));

const PiwiBar = styled(ExpandibleBottomBar)({
  position: 'absolute',
  bottom: 0,
});
