import React from 'react';
import styled from '@emotion/native';

export const CTX_TABLEHEAD = React.createContext<TableHeadContext>(false);
export default function TableHead({ children }: TableHeadProps) {
  return (
    <CTX_TABLEHEAD.Provider value={true}>
      <Root>{children}</Root>
    </CTX_TABLEHEAD.Provider>
  );
}

const Root = styled.View(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  flexDirection: 'column',
}));

export interface TableHeadProps {
  children: React.ReactNode;
}

export type TableHeadContext = boolean;
