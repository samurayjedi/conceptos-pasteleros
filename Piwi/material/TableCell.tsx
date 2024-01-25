import styled from '@emotion/native';

export default function TableCell({
  children,
  align = 'left',
}: TableCellProps) {
  return <Root align={align}>{children}</Root>;
}

const Root = styled.View<TableCellProps>(({ theme, align }) => ({
  flexDirection: 'column',
  flex: 1,
  alignItems: (() => {
    switch (align) {
      case 'right':
        return 'flex-end';
      case 'center':
        return 'center';
      default:
        return 'flex-start';
    }
  })(),
}));

export interface TableCellProps {
  children: React.ReactNode;
  align?: 'center' | 'left' | 'right';
}
