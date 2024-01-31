import React from 'react';
import { Theme } from '@emotion/react';
import styled from '@emotion/native';
import { Text, TextProps, View } from 'react-native';

export default React.forwardRef<Text, TypographyProps>((props, ref) => (
  <View>
    <PiwiText {...props} ref={ref} />
  </View>
));

const PiwiText = styled.Text<TypographyProps>(
  ({
    theme,
    align = 'left',
    color,
    gutterBottom,
    variant = 'body1',
    fontWeight = '100',
  }) => ({
    ...theme.typography[variant],
    fontFamily: 'Roboto',
    textAlign: align,
    color: (() => {
      switch (color) {
        case 'white':
          return theme.palette.common.white;
        case undefined:
        case 'textPrimary':
          return theme.palette.text.primary;
        case 'textSecondary':
          return theme.palette.text.secondary;
        case 'disabled':
          return theme.palette.text.disabled;
        default:
          return theme.palette[color].main;
      }
    })(),
    marginBottom: gutterBottom ? theme.spacing(1) : 0,
    fontWeight,
  }),
);

export interface TypographyProps extends TextProps {
  variant?: keyof Theme['typography'];
  color?:
    | 'white'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'textPrimary'
    | 'textSecondary'
    | 'disabled';
  align?: 'auto' | 'center' | 'justify' | 'left' | 'right';
  gutterBottom?: boolean;
  children: React.ReactNode;
  fontWeight?:
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}
