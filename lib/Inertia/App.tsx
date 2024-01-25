import React from 'react';
import { Text } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import AppPage from './AppPage';
import { InertiaPageResolver } from './createInertiaApp';

export default function App({ routes, resolve }: AppProps) {
  return (
    <NativeRouter>
      <React.Suspense fallback={<Text>Loading....</Text>}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route}
              path={route}
              element={<AppPage resolve={resolve} />}
            />
          ))}
        </Routes>
      </React.Suspense>
    </NativeRouter>
  );
}

export interface AppProps {
  routes: string[];
  resolve: InertiaPageResolver;
}
