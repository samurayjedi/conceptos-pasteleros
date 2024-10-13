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
  // request perform in every render, thats why i used useMemo
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
        const page = p as InertiaPage;
        navigate(page.url);
        setPage(page);
      })
      .addListener('onError', listenerId, (_) => {
        const errors = _ as InertiaError;
        setPage((p) => {
          const page = cloneDeep(p);
          page.props.errors = errors.errors;
          return page;
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
