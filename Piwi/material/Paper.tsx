import { View, ViewProps } from 'react-native';
import styled from '@emotion/native';

export default function Paper({ children, ...props }: ViewProps & { ref?: React.Ref<View> }) {
  return <PiwiPaper {...props}>{children}</PiwiPaper>;
}

const PiwiPaper = styled.View(({ theme }) => ({
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
  elevation: 5,
  padding: theme.spacing(4),
  backgroundColor: 'white',
  borderRadius: 8,
}));
