/* eslint-disable @typescript-eslint/ban-types */
import { FunctionComponent, useState } from 'react';
import { useSpring, animated } from '@react-spring/native';
import InertiaRequest from './InertiaRequest';

let color = '#000000';

function InertiaProgressView({ on }: InertiaProgressViewProps) {
  const [init, setInit] = useState(false);

  const { width } = useSpring({
    width: on || init ? 100 : 0,
    config: { duration: on ? 8000 : 250 },
    onStart: () => {
      if (on) {
        setInit(true);
      }
    },
    onRest: () => setInit(false),
  });

  return (
    <animated.View
      style={{
        width: width.to((w) => `${w}%`),
        opacity: init || on ? 1 : 0,
        height: 4,
        backgroundColor: color,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        elevation: 999,
      }}
    />
  );
}

export default class InertiaProgress {
  static init(props: InertiaProgressProps) {
    color = props.color;
    InertiaRequest.setIndicator(InertiaProgressView as FunctionComponent<{}>);
  }
}

interface InertiaProgressProps {
  color: ColorString;
}

interface InertiaProgressViewProps {
  on: boolean;
}
