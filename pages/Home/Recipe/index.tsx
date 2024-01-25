import React from 'react';
import _ from 'lodash';
import { View, ViewProps } from 'react-native';
import styled from '@emotion/native';
import RecipePaper from './RecipePaper';

export default React.forwardRef<View, ViewProps>((props, ref) => {
  return (
    <Root {...props} ref={ref}>
      <RecipePaper />
    </Root>
  );
});

const Root = styled.View({
  position: 'relative',
  flex: 1,
  width: '100%',
});
