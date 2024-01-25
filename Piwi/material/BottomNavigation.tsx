import React, { useMemo } from 'react';
import styled from '@emotion/native';
import { ViewProps } from 'react-native';

export const BOTTOMNAVIGATION_CONTEXT =
  React.createContext<BottomNavigationContext | null>(null);

export default function BottomNavigation({
  children,
  showLabel,
  color,
  textColor,
  ...props
}: BottomNavigationProps) {
  const ctxValue = useMemo(
    () => ({
      showLabel,
      color,
      textColor,
    }),
    [showLabel, color, textColor],
  );

  return (
    <BOTTOMNAVIGATION_CONTEXT.Provider value={ctxValue}>
      <BottomNavigationRoot {...props}>{children}</BottomNavigationRoot>
    </BOTTOMNAVIGATION_CONTEXT.Provider>
  );
}

const BottomNavigationRoot = styled.View(({ theme }) => ({
  width: '100%',
  flexDirection: 'row',
  borderRadius: 0,
  backgroundColor: theme.palette.paper,
  // bottom shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
  elevation: 5,
}));

export interface BottomNavigationProps extends ViewProps {
  showLabel?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  textColor?: string;
}

interface BottomNavigationContext {
  showLabel?: boolean;
  color?: BottomNavigationProps['color'];
  textColor?: BottomNavigationProps['textColor'];
}
