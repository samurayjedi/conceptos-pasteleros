import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
import _ from 'lodash';
import {
  useTransition,
  useSpringRef,
  animated,
  config,
} from '@react-spring/native';
import { StatusBar } from 'expo-status-bar';
import styled from '@emotion/native';
import { View, ViewProps } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AppBar from '../Piwi/material/AppBar';
import Toolbar from '../Piwi/material/Toolbar';
import IconButton from '../Piwi/material/IconButton';
import Typography from '../Piwi/material/Typography';
import Drawer, { DrawerInterface } from '../Piwi/anim/ShapeOverlays/Drawer';

export const CtxAppBar = React.createContext<CtxInterface>({
  setAppBar: () => {},
});

export default function ConceptosAppBar({ children }: ConceptosAppBarProps) {
  const [appbar, setAppBar] = useState<AppBarBuilder>(null);
  const ctxValue = useMemo(() => ({ setAppBar }), []);
  const drawerRef = useRef<DrawerInterface>(null);

  const handleOpenDrawer = useCallback(() => {
    if (drawerRef.current) {
      drawerRef.current.toggle();
    }
  }, []);

  return (
    <CtxAppBar.Provider value={ctxValue}>
      <StatusBar style="light" />
      <Drawer ref={drawerRef} />
      <PiwiAppBar color="transparent">
        <Toolbar>
          {!appbar ? (
            <>
              <IconButton color="#ffffff" onPress={handleOpenDrawer}>
                <FontAwesome name="bars" />
              </IconButton>
              <Typography variant="h6" style={{ color: 'white' }}>
                Conceptos
              </Typography>
              <View style={{ flex: 1 }} />
              <IconButton color="#ffffff">
                <FontAwesome name="bell-o" />
              </IconButton>
            </>
          ) : (
            <appbar.el {...appbar.props} />
          )}
        </Toolbar>
      </PiwiAppBar>
      {children}
    </CtxAppBar.Provider>
  );
}

function PiwiToolbar({ appbar, handleOpenDrawer }: PiwiToolbarProps) {
  // animation
  const transRef = useSpringRef();
  const transitions = useTransition(appbar, {
    ref: transRef,
    keys: null,
    from: {
      position: 'absolute',
      display: 'none',
      opacity: 0,
      translateX: appbar ? 300 : -300,
      config: config.stiff,
    }, // 'translate3d(100%,0,0)'
    enter: {
      position: 'relative',
      display: 'flex',
      opacity: 1,
      translateX: 0,
      config: config.slow,
    }, // 'translate3d(0%,0,0)'
    leave: {
      position: 'absolute',
      display: 'flex',
      opacity: 0,
      translateX: appbar ? -300 : 300,
      config: config.stiff,
    }, // 'translate3d(-50%,0,0)'
  });
  // don't include the transRef as dependency!!!
  useEffect(() => {
    transRef.start();
  }, [appbar]);

  return (
    <>
      {transitions((style, piwi) => {
        return (
          <AnimatedToolbar
            style={
              {
                position: style.position.to((x) => x),
                display: style.display.to((d) => d),
                opacity: style.opacity.to((x) => x),
                transform: [
                  {
                    translateY: style.translateX.to((y) => y),
                  },
                ],
              } as any
            }
          ></AnimatedToolbar>
        );
      })}
    </>
  );
}

const PiwiAppBar = styled(AppBar)({
  position: 'relative',
  // bottom shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
  elevation: 0,
});

const ToolbarForwardRef = React.forwardRef<View, ViewProps>((props, ref) => (
  <Toolbar ref={ref} {...props} />
));
const AnimatedToolbar = animated(ToolbarForwardRef);

export interface ConceptosAppBarProps {
  children: React.ReactNode;
}

type AppBarBuilder = {
  el: (...props: any[]) => React.ReactNode;
  props: Record<string, unknown>;
} | null;

interface CtxInterface {
  setAppBar: React.Dispatch<React.SetStateAction<AppBarBuilder>>;
}

interface PiwiToolbarProps {
  appbar: AppBarBuilder;
  handleOpenDrawer: () => void;
}
