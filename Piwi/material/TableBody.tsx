import styled from '@emotion/native';

export default function TableBody({ children }: TableBodyProps) {
  return <Root>{children}</Root>;
}

const Root = styled.View({
  flexDirection: 'column',
});

export interface TableBodyProps {
  children: React.ReactNode;
}
