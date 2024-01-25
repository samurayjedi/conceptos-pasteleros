import React, { useMemo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';
import { cloneDeep, get, uniqueId } from 'lodash';
import { InertiaPageResolver } from './createInertiaApp';
import InertiaRequest from './InertiaRequest';
import { Inertia } from './Inertia';
import { PagePropsContext } from './usePage';

export default function ({ resolve }: { resolve: InertiaPageResolver }) {
  const path = useLocation().pathname;
  const listenerId = useMemo(() => uniqueId('inertia-listener-'), []);
  const navigate = useNavigate();
  // fuck request perform in every render, thats why i used useMemo
  const [page, setPage] = useState(
    useMemo(() => InertiaRequest.instance().sendInSuspense().read(), []),
  );
  const [status, setStatus] = useState(InertiaRequest.instance().theState());
  const Component = resolve(page.component);
  const Layout = get(Component, 'layout', null) || View;
  const Loading = InertiaRequest.Indicator();

  // When react router navigate
  useEffect(() => {
    if (path !== page.url) {
      Inertia.visit(path, {});
    }
  }, [path, page.url, navigate]);
  // When manual visit is performed
  useEffect(() => {
    InertiaRequest.instance()
      .addListener('onBefore', listenerId, () => {
        setStatus(InertiaRequest.instance().theState());
      })
      .addListener('onSuccess', listenerId, (p) => {
        const fuckPage = p as InertiaPage;
        navigate(fuckPage.url);
        setPage(fuckPage);
      })
      .addListener('onError', listenerId, (_) => {
        const fuckErrors = _ as InertiaError;
        setPage((p) => {
          const fuckPage = cloneDeep(p);
          fuckPage.props.errors = fuckErrors.errors;
          return fuckPage;
        });
      })
      .addListener('onFinish', listenerId, () => {
        setStatus(InertiaRequest.instance().theState());
      });
  }, [listenerId, navigate]);

  return (
    <PagePropsContext.Provider value={page}>
      <Loading on={status === 'pending'} />
      <Layout style={stylesheet.container}>
        <Component {...page.props} />
      </Layout>
    </PagePropsContext.Provider>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
  },
} as const);