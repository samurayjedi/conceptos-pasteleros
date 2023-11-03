import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import { animated, useSpring } from '@react-spring/native';
import { Text, TextProps, View, ViewProps } from 'react-native';
import styled from '@emotion/native';
import { FORMCONTROL_CONTEXT, FormControlProps } from './FormControl';
import { Theme, useTheme } from '@emotion/react';

export default function InputLabel({ children, ...props }: InputLabelProps) {
  const theme = useTheme();
  const {
    input,
    variant,
    disabled = false,
    error = false,
    color = 'primary',
  } = useContext(FORMCONTROL_CONTEXT);
  if (!input) {
    throw new Error('Input must be into FormControl context.');
  }
  const { focus, haveAdornments, haveText, editing, setInputLabel } = input;

  const spring = useSpring({
    from: {
      piwi: 0, // for remove border in Outlined inputs...
      color: sharedStyles.color.default(theme, error, disabled),
      fontSize: sharedStyles.fontSize.default(theme),
      translateY: sharedStyles.transform.default[0].translateY,
    },
    to: {
      piwi: 1,
      color: focus
        ? sharedStyles.color.focus(theme, error, color)
        : sharedStyles.color.default(theme, error, disabled),
      fontSize: sharedStyles.fontSize.piwi(theme),
      translateY: sharedStyles.transform.piwi(variant)[0].translateY,
    },
    reset: true,
    reverse: !focus && !haveText,
    immediate: haveText || (editing && !haveText),
  });

  useEffect(() => {
    setInputLabel(true);
  }, []);

  return (
    <AnimatedView
      style={{
        ...(!haveAdornments && {
          transform: [{ translateY: spring.translateY.to((y) => y) }],
        }),
      }}
      inputVariant={variant}
      haveAdornments={haveAdornments}
    >
      {variant === 'outlined' && <SuperPiwi />}
      <AnimatedText
        {...props}
        error={error}
        disabled={disabled}
        color={color}
        style={{
          ...(!haveAdornments && {
            color: spring.color.to((c) => c),
            fontSize: spring.fontSize.to((s) => s),
          }),
        }}
        haveAdornments={haveAdornments}
        focus={focus}
      >
        {children}
      </AnimatedText>
    </AnimatedView>
  );
}

const ViewForwardRef = React.forwardRef<View, InputLabelRootProps>(
  (props, ref) => <InputLabelRoot {...props} ref={ref} />,
);
const AnimatedView = animated(ViewForwardRef);
const TextForwardRef = React.forwardRef<Text, PiwiInputLabelProps>(
  (props, ref) => <PiwiInputLabel {...props} ref={ref} />,
);
const AnimatedText = animated(TextForwardRef);

const sharedStyles = {
  color: {
    default: (theme: Theme, error: boolean, disabled: boolean) =>
      (() => {
        if (error) {
          return theme.palette.error.main;
        }
        if (disabled) {
          return theme.palette.text.disabled;
        }
        return theme.palette.text.secondary;
      })(),
    focus: (
      theme: Theme,
      error: boolean,
      color: NonNullable<FormControlProps['color']>,
    ) => (error ? theme.palette.error.main : theme.palette[color].main),
  },
  transform: {
    default: [{ translateY: 0 }],
    piwi: (variant: FormControlProps['variant']) => [
      {
        translateY: (() => {
          switch (variant) {
            case 'standard':
              return -30;
            case 'filled':
              return -14;
            default:
              return -25;
          }
        })(),
      },
    ],
  },
  fontSize: {
    default: (theme: Theme) => theme.typography.h6.fontSize,
    piwi: (theme: Theme) => theme.typography.caption.fontSize - 1,
  },
};

const InputLabelRoot = styled.View<InputLabelRootProps>(
  ({ inputVariant, haveAdornments }) => ({
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 0,
    elevation: 0,
    paddingLeft: 4,
    paddingRight: 4,
    transform: sharedStyles.transform.default,
    ...(() => {
      switch (inputVariant) {
        case 'outlined':
          return {
            left: 8,
          };
        case 'filled':
          return {
            left: 7,
          };
        default:
          return {
            left: -4,
          };
      }
    })(),
    ...(!haveAdornments && {
      transform: sharedStyles.transform.piwi(inputVariant),
    }),
  }),
);

const PiwiInputLabel = styled.Text<PiwiInputLabelProps>(
  ({ theme, haveAdornments, focus, error, disabled, color }) => ({
    color: sharedStyles.color.default(theme, error, disabled),
    fontSize: sharedStyles.fontSize.default(theme),
    fontWeight: 'normal',
    ...(haveAdornments && {
      fontSize: sharedStyles.fontSize.piwi(theme),
    }),
    ...(focus && {
      color: error ? theme.palette.error.main : theme.palette[color].main,
    }),
    paddingRight: 8,
  }),
);

const SuperPiwi = styled.View({
  backgroundColor: 'white',
  position: 'absolute',
  width: '100%',
  height: 3,
});

export type InputLabelProps = TextProps;

interface InputLabelRootProps extends ViewProps {
  inputVariant: FormControlProps['variant'];
  haveAdornments: boolean;
}

interface PiwiInputLabelProps extends InputLabelProps {
  haveAdornments: boolean;
  focus: boolean;
  error: boolean;
  disabled: boolean;
  color: NonNullable<FormControlProps['color']>;
}
