import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { useTheme } from '@emotion/react';
import { useSpring, animated, config } from '@react-spring/native';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from './store';
import PIWI_THEME from './Piwi/root/theme';
import { createInertiaApp } from './lib/Inertia';
import InertiaProgress from './lib/Inertia/InertiaProgress';
import Pages from './pages';
import ConceptosAppBar from './src/ConceptosAppBar';
import { SERVER } from './src/Vars';

const routes = ['/'];

export default function App() {
  return createInertiaApp({
    server: `${SERVER}`,
    routes,
    resolve: (name) => {
      if (Object.hasOwnProperty.call(Pages, name)) {
        const pageName = name as keyof typeof Pages;
        const Component = Pages[pageName];
        if (!Object.hasOwnProperty.call(Component, 'layout')) {
          _.set(Component, 'layout', Layout);
        }
        return Component;
      }
      throw new Error(`Fuck ${name} page no found!!!`);
    },
    setup: ({ App, props }) => (
      <Provider store={store}>
        <ThemeProvider theme={PIWI_THEME}>
          <App {...props} />
        </ThemeProvider>
      </Provider>
    ),
  });
}

InertiaProgress.init({ color: '#f26c20' });

export const CtxLayout = React.createContext<CtxLayoutInterface>({
  setBackground: () => {
    //
  },
});
function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const [background, setBackground] = useState(
    theme.palette.primary.main as string,
  );
  const { backgroundColor } = useSpring({
    backgroundColor: background,
    config: config.molasses,
  });
  const ctxValue = useMemo(() => ({ setBackground }), []);

  return (
    <CtxLayout.Provider value={ctxValue}>
      <animated.View
        style={{
          backgroundColor: backgroundColor.to((c) => c),
          width: '100%',
          flex: 1,
        }}
      >
        <ConceptosAppBar>{children}</ConceptosAppBar>
      </animated.View>
    </CtxLayout.Provider>
  );
}

interface CtxLayoutInterface {
  setBackground: React.Dispatch<React.SetStateAction<string>>;
}
