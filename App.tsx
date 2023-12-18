import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from './store';
import PIWI_THEME from './Piwi/root/theme';
import Home from './pages/Home';
import ConceptosAppBar from './src/ConceptosAppBar';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={PIWI_THEME}>
        <ConceptosAppBar />
        <Home />
      </ThemeProvider>
    </Provider>
  );
}
