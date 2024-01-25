import React, { useContext } from 'react';

export const PagePropsContext = React.createContext<InertiaPage | null>(null);

export default function usePage() {
  const page = useContext(PagePropsContext);
  return page as InertiaPage;
}
