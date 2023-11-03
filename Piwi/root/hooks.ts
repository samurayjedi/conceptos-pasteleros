import { useState, useContext, useCallback } from 'react';
import _ from 'lodash';
import { FORMCONTROL_CONTEXT } from '../material/FormControl';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export function useBlurFocusHandlers(
  onFocus:
    | ((ev: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined,
  onBlur:
    | ((ev: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined,
  onChangeText: ((text: string) => void) | undefined,
) {
  const { input } = useContext(FORMCONTROL_CONTEXT);
  const [inFocus, inSetFocus] = useState(false);

  const focus = useCallback(() => {
    if (input) {
      input.setFocus(true);
    }
    inSetFocus(true);
    if (onFocus) {
      _.attempt(onFocus);
    }
  }, [onFocus]);

  const blur = useCallback(() => {
    if (input) {
      input.setFocus(false);
      input.setEditing(false);
    }
    inSetFocus(false);
    if (onBlur) {
      _.attempt(onBlur);
    }
  }, [onBlur]);

  const changeText = useCallback(
    (newText: string) => {
      if (input) {
        input.setHaveText(Boolean(newText.length));
        input.setEditing(true);
      }
      if (onChangeText) {
        _.attempt(onChangeText);
      }
    },
    [onChangeText],
  );

  return { inFocus, onFocus: focus, onBlur: blur, onChangeText: changeText };
}
