import React from 'react';
import styled from '@emotion/native';
import Typography, { TypographyProps } from './Typography';

export default function FormHelperText({ children, ...props }: FormHelperTextProps) {
  return (
    <PiwiHelperText {...props} variant="caption">
      {children}
    </PiwiHelperText>
  );
}

export interface FormHelperTextProps extends TypographyProps {
  children: React.ReactNode;
  error?: boolean;
}

const PiwiHelperText = styled(Typography)<FormHelperTextProps>(({ error, theme }) => ({
  paddingTop: theme.spacing(1),
  paddingLeft: theme.spacing(4),
  color: error ? theme.palette.error.main : theme.palette.text.secondary,
}));
