import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import _ from 'lodash';
import {
  useTransition,
  useSpringRef,
  animated,
  config,
} from '@react-spring/native';
import { View } from 'react-native';
import { useAppSelector } from '../../src/hooks';
import Entries from './Entries';
import Recipe from './Recipe';
import BottomNavigation from '../../Piwi/material/BottomNavigation';
import BottomNavigationAction from '../../Piwi/material/BottomNavigationAction';

export default function Home() {
  return (
    <>
      <Body />
      <Footer />
    </>
  );
}

function Body() {
  const openedRecipe = useAppSelector((state) => state.recipe.openedRecipe);
  // animation
  const transRef = useSpringRef();
  const transitions = useTransition(openedRecipe, {
    ref: transRef,
    keys: null,
    from: {
      position: 'absolute',
      display: 'none',
      opacity: 0,
      translateY: openedRecipe !== null ? 500 : -500,
      config: config.molasses,
    },
    enter: {
      position: 'relative',
      display: 'flex',
      opacity: 1,
      translateY: 0,
    },
    leave: {
      position: 'absolute',
      display: 'flex',
      opacity: 0,
      translateY: openedRecipe !== null ? -500 : 500,
      config: config.molasses,
    },
  });
  // don't include the transRef as dependency!!!
  useEffect(() => {
    transRef.start();
  }, [openedRecipe]);

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      {transitions((styles, state) => {
        const Component = state === null ? AnimatedEntries : AnimatedRecipe;

        return (
          <Component
            style={
              {
                display: styles.display.to((d) => d),
                opacity: styles.opacity.to((o) => o),
                position: styles.position.to((p) => p),
                transform: [
                  {
                    translateY: styles.translateY.to((y) => y),
                  },
                ],
              } as any
            }
          />
        );
      })}
    </View>
  );
}

function Footer() {
  const openedRecipe = useAppSelector((state) => state.recipe.openedRecipe);
  const theme = useTheme();

  return (
    <>
      <Piwi />
      <PiwiBottomNavigation
        color="secondary"
        textColor={theme.palette.common.white}
        showLabel={false}
      >
        {openedRecipe === null ? (
          <>
            <BottomNavigationAction label="Recipes" icon="th-list" />
            <BottomNavigationAction label="History" icon="clock-o" />
            <BottomNavigationAction label="Favorites" icon="bookmark" />
            <BottomNavigationAction label="Account" icon="user-o" />
          </>
        ) : (
          <>
            <BottomNavigationAction label="Tables" icon="table" />
            <BottomNavigationAction label="Metrics" icon="book" />
            <BottomNavigationAction label="Favorite" icon="heart-o" />
            <BottomNavigationAction label="Share" icon="share-alt" />
          </>
        )}
      </PiwiBottomNavigation>
    </>
  );
}

const AnimatedEntries = animated(Entries);
const AnimatedRecipe = animated(Recipe);

const Piwi = styled.View(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '20%',
  zIndex: -1,
  elevation: -1,
}));

const PiwiBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  backgroundColor: 'transparent',
  marginTop: -5,
}));
