import React, { useEffect, useState, useRef, useCallback } from 'react';
import { isEqual, attempt, uniqueId, drop } from 'lodash';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useSpring, animated, config } from '@react-spring/native';
import {
  View,
  ViewProps,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';

/** Ripples set ********************************************************************************************************* */

export default React.memo(
  ({
    children,
    onPressIn,
    ...props
  }: TouchableWithoutFeedbackProps & { children: React.ReactNode }) => {
    const ref = useRef<View>(null);
    const [ripples, setRipples] = useState<Array<RippleItem>>([]);

    return (
      <>
        <TouchableWithoutFeedback
          {...props}
          onPressIn={useCallback(
            (ev: GestureResponderEvent) => {
              if (onPressIn) {
                attempt(onPressIn);
              }
              /** Ripple position according touch coordinates (into component) */
              const x = ev.nativeEvent.locationX;
              const y = ev.nativeEvent.locationY;
              ref.current?.measure((fx, fy, width, height /* , px, py */) => {
                // console.log(width > height ? width : height);
                const ripple = {
                  id: uniqueId(`ripple-${x}${y}`),
                  size: width > height ? width : height,
                  x,
                  y,
                  onRest: () => setRipples((prev) => drop(prev)),
                };
                setRipples((prev) => {
                  if (prev.length < 4) {
                    return [...prev, ripple];
                  }
                  return [...drop(prev), ripple];
                });
              });
            },
            [onPressIn],
          )}
        >
          <View ref={ref} style={{ position: 'relative', flex: 0 }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
        {ripples.map((ripple) => (
          <Ripple
            key={ripple.id}
            size={ripple.size}
            x={ripple.x}
            y={ripple.y}
            onRest={ripple.onRest}
          />
        ))}
      </>
    );
  },
  isEqual,
);

interface RippleItem extends RippleProps {
  id: string;
}

/** Ripples item ******************************************************************************************************** */

const Ripple = React.memo(({ size, x, y, onRest, ...props }: RippleProps) => {
  const theme = useTheme();
  const [active, setActive] = useState(false);
  const [nextRipple, setNextRipple] = useState(false);
  const sizeDependingPos = calcSize(size, x /* , y */);
  const ripple = useSpring({
    o: active ? theme.palette.ripple.opacity : 0,
    size: active ? (nextRipple ? sizeDependingPos : size) : 0,
    onChange: (fuckAnimation) => {
      const fuckProps = fuckAnimation.value;
      if (fuckProps.size > size - 10) {
        setNextRipple(true);
      }
    },
    onRest: () => {
      if (!active && onRest) {
        attempt(onRest);
      } else if (active) {
        setActive(false);
      }
    },
  });

  useEffect(() => setActive(true), []);

  return (
    <AnimatedPiwiRipple
      {...props}
      style={{
        opacity: ripple.o.to((o) => o),
        width: active ? ripple.size.to((w) => w) : sizeDependingPos,
        height: active ? ripple.size.to((h) => h) : sizeDependingPos,
        left: active
          ? ripple.size.to((w) => calcPos(w, x))
          : calcPos(sizeDependingPos, x),
        top: active
          ? ripple.size.to((h) => calcPos(h, y))
          : calcPos(sizeDependingPos, y),
      }}
    />
  );
}, isEqual);

const radius = 50;

function calcSize(size: number, x: number /* , y: number */) {
  const sizeWithRadius = size + radius;
  const halfSize = size / 2;
  const fix = halfSize > x ? halfSize - x : x - halfSize;
  return sizeWithRadius + fix * 2;
}

function calcPos(dimension: number, pos: number) {
  return pos - dimension / 2;
}

const PiwiRipple = styled.View(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.ripple.background,
  borderRadius: radius,
  zIndex: -1,
  elevation: -1,
}));

const ForwardedPiwiRipple = React.forwardRef<View, ViewProps>((props, ref) => (
  <PiwiRipple {...props} />
));

const AnimatedPiwiRipple = animated(ForwardedPiwiRipple);

interface RippleProps extends ViewProps {
  size: number;
  x: number;
  y: number;
  onRest?: () => void;
}
