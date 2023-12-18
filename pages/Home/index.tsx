import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/native';
import _ from 'lodash';
import { useTransition, useSpringRef, animated } from '@react-spring/native';
import { View } from 'react-native';
import Paper from '../../Piwi/material/Paper';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import Entries from './Entries';

export const CTX = React.createContext<HomeContext>({
  setActiveEntry: () => {},
});
export default function Home() {
  const [activeEntry, setActiveEntry] = useState<boolean>(false);
  const ctxValue = useMemo(
    () => ({
      setActiveEntry,
    }),
    [],
  );
  // animation
  const transRef = useSpringRef();
  const transitions = useTransition(Number(activeEntry), {
    ref: transRef,
    keys: null,
    from: { position: 'absolute', opacity: 0, translateX: 100 }, // 'translate3d(100%,0,0)'
    enter: { position: 'relative', opacity: 1, translateX: 0 }, // 'translate3d(0%,0,0)'
    leave: { position: 'absolute', opacity: 0, translateX: -50 }, // 'translate3d(-50%,0,0)'
  });
  // don't include the transRef as dependency!!!
  useEffect(() => {
    transRef.start();
  }, []);

  return (
    <CTX.Provider value={ctxValue}>
      <Root>
        {transitions((style, piwi) => {
          const s = style as unknown as any;
          const Page = piwi === 0 ? Entries : EntryPaper;
          console.log(piwi);

          return (
            <animated.View style={{ ...s, flex: 1 }}>
              <Page />
            </animated.View>
          );
        })}
      </Root>
    </CTX.Provider>
  );
}

const Root = styled.View(({ theme }) => ({
  position: 'relative',
  flex: 1,
  backgroundColor: theme.palette.primary.main,
}));

const RootForwardRef = React.forwardRef<View, ViewProps>((props, ref) => (
  <Root {...props} ref={ref} />
));

const AnimatedRoot = animated(RootForwardRef);

const EntryPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: 30,
  flex: 1,
  alignItems: 'stretch',
  padding: 0,
  paddingTop: 30,
}));

export interface HomeContext {
  setActiveEntry: React.Dispatch<React.SetStateAction<boolean>>;
}
