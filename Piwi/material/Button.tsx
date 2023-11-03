import React from 'react';
import _ from 'lodash';
import { StyleSheet, TextProps, ViewProps } from 'react-native';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import Ripple from '../root/Ripple';

export default function Button({
  children,
  color = 'primary',
  variant = 'text',
  startIcon,
  endIcon,
  disabled = false,
  size = 'medium',
  ...props
}: ButtonProps) {
  const haveStartIcon = typeof startIcon !== 'undefined';
  const haveEndIcon = typeof endIcon !== 'undefined';

  return (
    <ButtonRoot>
      <Ripple disabled={disabled}>
        <PiwiButton
          startIcon={haveStartIcon}
          endIcon={haveEndIcon}
          variant={variant}
          color={color}
          size={size}
          {...props}
        >
          {children}
        </PiwiButton>
      </Ripple>
      {(startIcon || endIcon) && (
        <Adornment
          position={endIcon ? 'end' : 'start'}
          disabled={disabled}
          variant={variant}
          color={color}
          adornment={endIcon}
        />
      )}
    </ButtonRoot>
  );
}

function Adornment({
  adornment,
  disabled,
  color,
  variant,
  position,
}: {
  adornment: React.ReactNode;
  disabled: boolean;
  color: NonNullable<ButtonProps['color']>;
  variant: Variants;
  position: 'start' | 'end';
}) {
  const theme = useTheme();

  return (
    <>
      {React.Children.map(adornment, (child) => {
        if (React.isValidElement(child)) {
          const props = {
            style: StyleSheet.create({}),
            size: 20,
            color: disabled
              ? theme.palette.text.disabled
              : variant === 'text'
              ? theme.palette[color].main
              : theme.palette.common.white,
            position: 'absolute',
            ...(position === 'end'
              ? { right: theme.spacing(2) }
              : { left: theme.spacing(2) }),
          };
          return React.cloneElement(child, props);
        }
        return child;
      })}
    </>
  );
}

const ButtonRoot = styled.View({
  position: 'relative',
  overflow: 'hidden',

  alignSelf: 'flex-start',
  justifyContent: 'center',
});

const PiwiButton = styled.Text<{
  startIcon: boolean;
  endIcon: boolean;
  variant: Variants;
  color: NonNullable<ButtonProps['color']>;
  size: NonNullable<ButtonProps['size']>;
}>(({ theme, startIcon, endIcon, variant, color, size }) => ({
  ...theme.typography.button,
  color:
    variant === 'contained'
      ? theme.palette.common.white
      : theme.palette[color].main,
  zIndex: 0,
  elevation: 0,
  ...(() => {
    switch (size) {
      case 'small':
        return {
          padding: 6,
          paddingRight: theme.spacing(1),
          paddingLeft: theme.spacing(1),
        };
      case 'large':
        return {
          padding: 14,
          paddingRight: theme.spacing(2),
          paddingLeft: theme.spacing(2),
        };
      default:
        return {
          padding: 10,
          paddingRight: theme.spacing(2),
          paddingLeft: theme.spacing(2),
        };
    }
  })(),
  textAlign: 'center',
  flexDirection: 'row',
  ...(startIcon && { paddingLeft: theme.spacing(8) }),
  ...(endIcon && { paddingRight: theme.spacing(8) }),
  borderRadius: 4,
  ...(() => {
    switch (variant) {
      case 'contained':
        return { backgroundColor: theme.palette[color].main };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.palette[color].main,
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
    }
  })(),
}));

type Variants = 'contained' | 'outlined' | 'text';

interface ButtonProps extends TextProps {
  children: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: Variants;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}
