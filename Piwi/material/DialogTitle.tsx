import styled from '@emotion/native';
import Typography, { TypographyProps } from './Typography';
import { View } from 'react-native';

export default function DialogTitle({
  children,
  variant = 'h5',
  color = 'primary',
  ...props
}: TypographyProps) {
  return (
    <Piwi>
      <Divider />
      <Typography {...props}>{children}</Typography>
    </Piwi>
  );
}

const Piwi = styled.View(({ theme }) => ({
  marginBottom: 5,
  paddingBottom: 5,
  marginTop: -10,
}));

const Divider = styled.View(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -5,
  borderBottomWidth: 1,
  borderBottomColor: theme.palette.divider,
}));
