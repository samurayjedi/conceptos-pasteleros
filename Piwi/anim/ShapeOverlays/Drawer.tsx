import React, {
  useState,
  useImperativeHandle,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import styled from '@emotion/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  View,
  ViewProps,
  TouchableWithoutFeedback,
  Text,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';
import Constants from 'expo-constants';
import ShapeOverlays from '.';
import Button from '../../material/Button';
import IconButton, { IconButtonProps } from '../../material/IconButton';
import { animated, useSpring } from '@react-spring/native';

const Drawer = React.forwardRef<DrawerInterface, ViewProps>((props, ref) => {
  const overlayRef = useRef<OverlayInterface>(null);
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    if (overlayRef.current && !overlayRef.current.overlays.isAnimating) {
      setOpen((prev) => !prev);
      overlayRef.current.overlays.toggle();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    toggle,
  }));

  return (
    <Root>
      <Wrapper>
        <PiwiOverlay ref={overlayRef} />
        {open && (
          <Content>
            <IconButton onPress={toggle} style={{ alignSelf: 'flex-start' }}>
              <FontAwesome name="arrow-left" color="#ffffff" />
            </IconButton>
            <View style={{ flex: 1 }} />
            <Item>Inicio</Item>
            <Item>Mis Recetas</Item>
            <Item>Novedades</Item>
            <Item>Ayuda</Item>
            <View style={{ flex: 1 }} />
          </Content>
        )}
      </Wrapper>
    </Root>
  );
});

export default Drawer;

const PiwiOverlay = React.forwardRef<OverlayInterface, {}>((props, ref) => {
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [d3, setD3] = useState('');

  const overlays = useMemo(
    () =>
      new ShapeOverlays({
        setD: [setD1, setD2, setD3],
      }),
    [],
  );

  useImperativeHandle(ref, () => ({
    overlays,
  }));

  return (
    <Overlay viewBox="0 0 100 100" preserveAspectRatio="none">
      <Path fill="#f26c20" d={d1} />
      <Path fill="#f09f7a" d={d2} />
      <Path fill="#243c86" d={d3} />
    </Overlay>
  );
});

function Item({ children, ...props }: TouchableWithoutFeedbackProps) {
  return (
    <TouchableWithoutFeedback {...props}>
      <MenuItem>{children}</MenuItem>
    </TouchableWithoutFeedback>
  );
}

const Root = styled.View({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 997,
  elevation: 997,
});

const Wrapper = styled.View({
  position: 'relative',
  height: '100%',
});

const Content = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: Constants.statusBarHeight,
});

const MenuItem = styled.Text(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.common.white,
  letterSpacing: 1,
  textTransform: 'uppercase',
  paddingBottom: theme.spacing(2),
}));

const Overlay = styled(Svg)({
  position: 'absolute',
  zIndex: -1,
  elevation: -1,
});

export interface DrawerInterface {
  toggle: () => void;
}

interface OverlayInterface {
  overlays: ShapeOverlays;
}
