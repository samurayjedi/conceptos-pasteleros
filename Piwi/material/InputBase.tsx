import React, {
  useCallback,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from 'react';
import { useTheme, Theme } from '@emotion/react';
import _ from 'lodash';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';
import styled from '@emotion/native';
import { FORMCONTROL_CONTEXT } from './FormControl';

export const INPUT_BASE_CONTEXT = createContext<InputBaseContext>({
  in: false,
});

export default function InputBase({
  style,
  name,
  startAdornment = null,
  endAdornment = null,
  disabled = false,
  readonly = false,
  onChange,
  inputComponent = <TextInput />,
  ...props
}: InputBaseProps) {
  const theme = useTheme();
  const { input } = useContext(FORMCONTROL_CONTEXT);
  const piwi = useMemo<InputBaseContext>(
    () => ({
      in: true,
      adornment: {
        color: disabled
          ? theme.palette.text.disabled
          : theme.palette.text.secondary,
        size: 'small',
      },
    }),
    [disabled],
  );
  const styles = useMemo(() => stylesheet(theme), []);

  /** Run only the first time, for expose the input initial state to others fields, example InputLabel */
  useEffect(() => {
    if (input) {
      if (startAdornment || endAdornment) {
        input.setHaveAdornments(true);
      }

      if (props.value && props.value.length) {
        input.setHaveText(true);
      }
    }
  }, []);

  return (
    <INPUT_BASE_CONTEXT.Provider value={piwi}>
      <InputBaseContainer
        startAdornment={Boolean(startAdornment)}
        endAdorment={Boolean(endAdornment)}
      >
        {startAdornment && <StartAdornment>{startAdornment}</StartAdornment>}
        {React.cloneElement(inputComponent, {
          ...props,
          style: [style, styles.input],
          editable: (() => {
            if (disabled) {
              return false;
            }
            if (readonly) {
              return false;
            }
            return true;
          })(),
          onChange: useCallback<NonNullable<TextInputProps['onChange']>>(
            (ev) => {
              if (onChange) {
                onChange({ ...ev, type: 'text' }, name, ev.nativeEvent.text);
              }
            },
            [name, onChange],
          ),
        })}
        {endAdornment && <EndAdornment>{endAdornment}</EndAdornment>}
      </InputBaseContainer>
    </INPUT_BASE_CONTEXT.Provider>
  );
}

export interface InputBaseContext {
  in: boolean;
  adornment?: {
    color: string;
    size: 'small' | 'medium' | 'large';
  };
}

export type InputBaseProps = Omit<TextInputProps, 'onChange' | 'editable'> & {
  name?: string;
  onChange?: (
    ev: InputOnChangeEvent,
    name: string | undefined,
    value: string | undefined,
  ) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  readonly?: boolean;
  inputComponent?: React.ReactElement<TextInputProps & Record<string, unknown>>;
};

export interface InputOnChangeEvent
  extends NativeSyntheticEvent<TextInputChangeEventData> {
  type: 'text';
}

const InputBaseContainer = styled.View<{
  startAdornment: boolean;
  endAdorment: boolean;
}>(({ theme, startAdornment, endAdorment }) => ({
  flexDirection: 'row',
  alignItems: 'flex-end',
  position: 'relative',
  ...(startAdornment && {
    paddingLeft: theme.spacing(3),
  }),
  ...(endAdorment && {
    paddingRight: theme.spacing(3),
  }),
}));

const StartAdornment = styled.View(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: -10,
}));

const EndAdornment = styled.View(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: -10,
}));

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    input: {
      flex: 1,
      minWidth: 100,
      paddingTop: 4,
      paddingBottom: 5,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.caption.fontSize,
    },
  });
