import {
  Modal,
  ModalProps,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from '@emotion/native';
import Paper from './Paper';

export default function Dialog({
  onClose = () => {
    /** */
  },
  children,
  open,
  ...props
}: DialogProps) {
  return (
    <Modal visible={open} {...props}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Backdrop />
      </TouchableWithoutFeedback>
      <View style={{ flex: 1 }} />
      <MyPaper>{children}</MyPaper>
      <View style={{ flex: 1 }} />
    </Modal>
  );
}

const Backdrop = styled.View(({ theme }) => ({
  position: 'absolute',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  backgroundColor: theme.palette.common.black,
  opacity: 0.2,
}));

const MyPaper = styled(Paper)({
  alignSelf: 'center',
});

export interface DialogProps
  extends Omit<ModalProps, 'visible' | 'onRequestClose'> {
  open: boolean;
  onClose?: () => void;
}
