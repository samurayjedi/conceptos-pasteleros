import styled from '@emotion/native';
import { ViewProps } from 'react-native';

export default function DialogActions(props: ViewProps) {
  return <Root {...props} />;
}

const Root = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
  marginLeft: -10,
  marginRight: -10,
  marginBottom: -20,
}));
