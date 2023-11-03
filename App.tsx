import { ThemeProvider } from '@emotion/react';
import PIWI_THEME from './Piwi/root/theme';
import Main from './src/Main';

export default function App() {
  return (
    <ThemeProvider theme={PIWI_THEME}>
      <Main />
    </ThemeProvider>
  );
}
