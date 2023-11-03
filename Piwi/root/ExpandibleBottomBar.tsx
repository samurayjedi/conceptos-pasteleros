import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { useSpring, animated } from '@react-spring/native';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';

export default function ExpandibleBottomBar({
  whithoutAnim = false,
  show,
  color = 'primary',
  error = false,
  disabled = false,
  ...rest
}: ExpandibleBottomBarProps) {
  const theme = useTheme();
  /** Animations */
  const { w } = useSpring({
    from: {
      w: 0,
    },
    to: {
      w: 100,
    },
    reset: true,
    reverse: !show,
  });

  return (
    <BarRoot {...rest}>
      <StaticBar />
      {whithoutAnim && (
        <animated.View
          style={{
            position: 'absolute',
            height: 2,
            backgroundColor: theme.palette[color].main,
            width: w.to((piwi) => `${piwi}%`),
          } as any}
        />
      )}
    </BarRoot>
  );
}

const BarRoot = styled.View(({ theme }) => ({
  position: 'relative',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StaticBar = styled.View<PiwiBottomBar>(({ theme, disabled, error }) => ({
  position: 'absolute',
  width: '100%',
  borderStyle: disabled ? 'dotted' : 'solid',
  borderBottomWidth: 1,
  borderColor: (() => {
    if (error) {
      return theme.palette.error.main;
    }
    if (disabled) {
      return theme.palette.text.disabled;
    }
    return theme.input.filled.borderColor;
  })(),
}));

export interface ExpandibleBottomBarProps extends React.ComponentProps<typeof View> {
  show: boolean;
  color?: 
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  whithoutAnim?: boolean;
  error?: boolean;
  disabled?: boolean;
}

type PiwiBottomBar = Omit<ExpandibleBottomBarProps, 'show'> & ViewProps;
