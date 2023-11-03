import { useCallback, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from '@emotion/native';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AppBar from '../Piwi/material/AppBar';
import Toolbar from '../Piwi/material/Toolbar';
import IconButton from '../Piwi/material/IconButton';
import Typography from '../Piwi/material/Typography';
import Drawer, { DrawerInterface } from '../Piwi/anim/ShapeOverlays/Drawer';

export default function ConceptosAppBar() {
  const drawerRef = useRef<DrawerInterface>(null);

  const handleOpenDrawer = useCallback(() => {
    if (drawerRef.current) {
      drawerRef.current.toggle();
    }
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Drawer ref={drawerRef} />
      <PiwiAppBar>
        <Toolbar>
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
        </Toolbar>
      </PiwiAppBar>
    </>
  );
}

const PiwiAppBar = styled(AppBar)({
  // bottom shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
  elevation: 0,
});
