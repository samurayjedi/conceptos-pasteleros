import React from 'react';
import { ViewProps, Dimensions, View } from 'react-native';
import Constants from 'expo-constants';
import { Theme } from '@emotion/react';
import styled from '@emotion/native';

export default React.forwardRef<View, AppBarProps>(({ children, ...props }, ref) => {
  return (
    <PiwiAppBar {...props} ref={ref}>
      <PiwiStatusBar />
      {children}
    </PiwiAppBar>
  );
});

const PiwiAppBar = styled.View<AppBarProps>(({ theme, color = 'primary' }) => ({
  backgroundColor: getColor(theme, color),
  zIndex: 5,
  width: Dimensions.get('window').width + 10,
  marginLeft: -5,
  height: 78,
  // bottom shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
  elevation: 5,
}));

const PiwiStatusBar = styled.View({
  width: '100%',
  height: Constants.statusBarHeight,
  backgroundColor: 'rgba(52, 52, 52, .3)',
});

export interface AppBarProps extends ViewProps {
  color?: 'default' | 'primary' | 'secondary' | 'transparent';
}

export const getColor = (theme: Theme, color: AppBarProps['color']) => {
  switch (color) {
    case 'primary':
    case 'secondary':
      return theme.palette[color].main;
    case 'transparent':
      return 'rgba(52, 52, 52, 0)';
  }

  return theme.palette.common.white;
}
