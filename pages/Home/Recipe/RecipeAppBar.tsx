import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import _ from 'lodash';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { View, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppSelector, useAppDispatch } from '../../../src/hooks';
import {
  changePreparationsToMake,
  changeWeightToPrepare,
} from '../../../store/recipe';
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
  const nInputRef = useRef<TextFieldInterface>(null);
  const tWeightInputRef = useRef<TextFieldInterface>(null);
  const dispatch = useAppDispatch();
  const n = useAppSelector(
    useCallback((state) => state.recipe.preparations, []),
  );
  const tWeight = useAppSelector(
    useCallback((state) => state.recipe.weight, []),
  );
  const theme = useTheme();
  const { setAppBar } = useContext(CtxAppBar);
  const { setBackground } = useContext(CtxLayout);
  const [openNDialog, setOpenNDialog] = useState(false);
  const [openTWeightDialog, setOpenTWeightDialog] = useState(false);

  const back = useCallback(() => {
    setBackground(theme.palette.primary.main);
    setAppBar(null);
    onClose();
  }, []);

  const displayNModal = useCallback(() => setOpenNDialog(true), []);
  const closeNModal = useCallback(() => setOpenNDialog(false), []);
  const displayTWeightModal = useCallback(() => setOpenTWeightDialog(true), []);
  const closeTWeightModal = useCallback(() => setOpenTWeightDialog(false), []);

  const changeN = useCallback(() => {
    if (nInputRef.current) {
      const value = parseInt(nInputRef.current.value || '', 10);

      if (!isNaN(value)) {
        dispatch(changePreparationsToMake(value));
        closeNModal();
      }
    }
  }, []);

  const changeTWeight = useCallback(() => {
    if (tWeightInputRef.current) {
      const value = parseInt(tWeightInputRef.current.value || '', 10);

      if (!isNaN(value)) {
        dispatch(changeWeightToPrepare(value));
        closeTWeightModal();
      }
    }
  }, []);

  return (
    <>
      <IconButton color="#ffffff" onPress={back}>
        <FontAwesome name="angle-left" />
      </IconButton>
      <View>
        <Typography variant="subtitle1" fontWeight="bold" color="white">
          {name}
        </Typography>
        <Stats>
          <Typography variant="subtitle2" color="white">
            Units: {n}
          </Typography>
          <TouchableWithoutFeedback onPress={displayNModal}>
            <Edit variant="subtitle2" fontWeight="bold" color="white">
              Edit
            </Edit>
          </TouchableWithoutFeedback>
          <Typography variant="subtitle2" color="white">
            Weight: {tWeight}
          </Typography>
          <TouchableWithoutFeedback onPress={displayTWeightModal}>
            <Edit variant="subtitle2" fontWeight="bold" color="white">
              Edit
            </Edit>
          </TouchableWithoutFeedback>
        </Stats>
      </View>
      <Dialog
        open={openNDialog}
        animationType="fade"
        transparent
        onClose={closeNModal}
      >
        <DialogTitle>How many preparations do you want to make?</DialogTitle>
        <DialogContent>
          <View style={{ padding: 10 }} />
          <PiwiTextField
            value={n.toString()}
            ref={nInputRef}
            variant="standard"
            label="Number of preparations:"
            keyboardType="numeric"
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onPress={closeNModal}>
            Cancel
          </Button>
          <Button color="primary" onPress={changeN}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openTWeightDialog}
        animationType="fade"
        transparent
        onClose={closeTWeightModal}
      >
        <DialogTitle>How much preparation do you want to do?</DialogTitle>
        <DialogContent>
          <View style={{ padding: 10 }} />
          <PiwiTextField
            value={tWeight.toString()}
            ref={tWeightInputRef}
            variant="standard"
            label="Gr:"
            keyboardType="numeric"
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onPress={closeTWeightModal}>
            Cancel
          </Button>
          <Button color="primary" onPress={changeTWeight}>
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
    const [value, setValue] = useState(props.value || '');

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

const Stats = styled.View({
  flexDirection: 'row',
  position: 'relative',
  top: 2,
});

const Edit = styled(Typography)({
  paddingLeft: 5,
  paddingRight: 5,
});

export interface RecipeAppBarProps {
  name: string;
  onClose: NonNullable<EntryProps['onClose']>;
}

interface TextFieldInterface {
  value: string | undefined;
}
