import React, { useMemo } from 'react';
import styled from '@emotion/native';

export const CTX_TABLE = React.createContext<TableContext>({ dense: false });
export default function Table({ children, dense = false }: TableProps) {
  const ctxValue = useMemo(
    () => ({
      dense,
    }),
    [dense],
  );

  return (
    <CTX_TABLE.Provider value={ctxValue}>
      <Root>{children}</Root>
    </CTX_TABLE.Provider>
  );
}

const Root = styled.View({
  width: '100%',
  flexDirection: 'column',
});

export interface TableProps {
  children: React.ReactNode;
  dense?: boolean;
}

export interface TableContext {
  dense: boolean;
}
