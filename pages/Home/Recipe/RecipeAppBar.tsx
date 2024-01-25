import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import _ from 'lodash';
import { useTheme } from '@emotion/react';
import { View, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppSelector, useAppDispatch } from '../../../src/hooks';
import { changePreparationsToMake } from '../../../store/recipe';
import { CtxAppBar } from '../../../src/ConceptosAppBar';
import { CtxLayout } from '../../../App';
import type { EntryProps } from '../Entry';
import Typography from '../../../Piwi/material/Typography';
import IconButton from '../../../Piwi/material/IconButton';
import Dialog from '../../../Piwi/material/Dialog';
import DialogTitle from '../../../Piwi/material/DialogTitle';
import DialogContent from '../../../Piwi/material/DialogContent';
import DialogActions from '../../../Piwi/material/DialogActions';
import TextField, { TextFieldProps } from '../../../Piwi/material/TextField';
import Button from '../../../Piwi/material/Button';

export default function RecipeAppBar({ name, onClose }: RecipeAppBarProps) {
  const inputRef = useRef<TextFieldInterface>(null);
  const dispatch = useAppDispatch();
  const preparations = useAppSelector(
    useCallback((state) => state.recipe.preparations, []),
  );
  const theme = useTheme();
  const { setAppBar } = useContext(CtxAppBar);
  const { setBackground } = useContext(CtxLayout);
  const [open, setOpen] = useState(false);

  const back = useCallback(() => {
    setBackground(theme.palette.primary.main);
    setAppBar(null);
    onClose();
  }, []);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const changePreparationsNumber = useCallback(() => {
    if (inputRef.current) {
      const value = parseInt(inputRef.current.value || '', 10);

      if (!isNaN(value)) {
        dispatch(changePreparationsToMake(value));
        closeModal();
      }
    }
  }, []);

  return (
    <>
      <IconButton color="#ffffff" onPress={back}>
        <FontAwesome name="angle-left" />
      </IconButton>
      <View>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          style={{ color: 'white' }}
        >
          {name}
        </Typography>
        <View style={{ flexDirection: 'row' }}>
          <Typography variant="subtitle2" style={{ color: 'white' }}>
            Units: {preparations}
          </Typography>
          <TouchableWithoutFeedback onPress={openModal}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              style={{ color: 'white', paddingLeft: 5, paddingRight: 5 }}
            >
              Edit
            </Typography>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Dialog open={open} animationType="fade" transparent onClose={closeModal}>
        <DialogTitle>How many preparations do you want to make?</DialogTitle>
        <DialogContent>
          <View style={{ padding: 10 }} />
          <PiwiTextField
            ref={inputRef}
            variant="standard"
            label="Number of preparations:"
            keyboardType="numeric"
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onPress={closeModal}>
            Cancel
          </Button>
          <Button color="primary" onPress={changePreparationsNumber}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const PiwiTextField = React.forwardRef<TextFieldInterface, TextFieldProps>(
  (
    {
      onChange = () => {
        /** */
      },
      ...props
    },
    ref,
  ) => {
    const preparations = useAppSelector(
      useCallback((state) => state.recipe.preparations, []),
    );
    const [value, setValue] = useState(preparations.toString());

    useImperativeHandle(ref, () => ({
      value,
    }));

    return (
      <TextField
        {...props}
        value={value.toString()}
        onChange={(ev, name, piwiValue) => {
          setValue(piwiValue || '');
          onChange(ev, name, piwiValue);
        }}
      />
    );
  },
);

export interface RecipeAppBarProps {
  name: string;
  onClose: NonNullable<EntryProps['onClose']>;
}

interface TextFieldInterface {
  value: string | undefined;
}
