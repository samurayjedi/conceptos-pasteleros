import { useContext } from 'react';
import styled from '@emotion/native';
import { CTX_TABLE } from './Table';
import { CTX_TABLEHEAD } from './TableHead';

export default function TableRow({ children }: TableRowProps) {
  const { dense } = useContext(CTX_TABLE);
  const intoTableHead = useContext(CTX_TABLEHEAD);

  return (
    <Root dense={dense} intoTableHead={intoTableHead}>
      {children}
    </Root>
  );
}

const Root = styled.View<RootProps>(({ theme, dense, intoTableHead }) => ({
  flexDirection: 'row',
  borderBottomWidth: 2,
  borderBottomColor: theme.palette.divider,
  padding: (() => {
    if (dense) {
      return theme.spacing(1) + (intoTableHead ? 0 : -4);
    }

    return theme.spacing(2) + (intoTableHead ? 0 : -4);
  })(),
}));

export interface TableRowProps {
  children: React.ReactNode;
}

interface RootProps {
  dense: boolean;
  intoTableHead: boolean;
}
