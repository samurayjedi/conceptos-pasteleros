import React, { useCallback, useContext, useMemo, useState } from 'react';
import styled from '@emotion/native';
import _ from 'lodash';
import { View, ViewProps, FlatList, ListRenderItem } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from '../../src/hooks';
import { usePage } from '../../lib/Inertia';
import {
  openedRecipeCategory,
  Category,
  Recipe,
  openedRecipe,
} from '../../store/recipe';
import FormControl from '../../Piwi/material/FormControl';
import OutlinedInput from '../../Piwi/material/OutlinedInput';
import IconButton from '../../Piwi/material/IconButton';
import Entry, { ENTRY_HEIGHT } from './Entry';
import Paper from '../../Piwi/material/Paper';
import Button from '../../Piwi/material/Button';

export default React.forwardRef<View, ViewProps>((props, ref) => {
  return (
    <Root {...props} ref={ref}>
      <EntriesContent />
    </Root>
  );
});

const EntriesContent = React.memo(() => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.recipe.openedRecipeCategory);

  return (
    <>
      <SearchContainer>
        <FormControl fullWidth>
          <OutlinedInput
            color="secondary"
            placeholder="Buscar"
            endAdornment={
              <IconButton color="#979797">
                <FontAwesome name="search" />
              </IconButton>
            }
          />
        </FormControl>
      </SearchContainer>
      <PiwiPaper>
        <SortButtons>
          <SortButton
            active={category === 'basics'}
            variant="contained"
            color="secondary"
            onPress={() => {
              dispatch(openedRecipeCategory('basics'));
              dispatch(openedRecipe(null));
            }}
          >
            Básicas
          </SortButton>
          <View style={{ padding: 5 }} />
          <SortButton
            active={category === 'classics'}
            variant="contained"
            color="secondary"
            onPress={() => {
              dispatch(openedRecipeCategory('classics'));
              dispatch(openedRecipe(null));
            }}
          >
            Clásicas
          </SortButton>
          <View style={{ padding: 5 }} />
          <SortButton
            active={category === 'gourmet'}
            variant="contained"
            color="secondary"
            onPress={() => {
              dispatch(openedRecipeCategory('gourmet'));
              dispatch(openedRecipe(null));
            }}
          >
            Modernas
          </SortButton>
        </SortButtons>
        <View style={{ padding: 6 }} />
        <RecipesFlatList category={category} />
        <View style={{ paddingTop: 10 }} />
      </PiwiPaper>
    </>
  );
}, _.isEqual);

const RecipesFlatList = React.memo(
  ({ category }: { category: Category['slug'] }) => {
    const collections = usePage().props as unknown as {
      basics: Recipe[];
      classics: Recipe[];
      gourmet: Recipe[];
    };
    const dispatch = useAppDispatch();
    const onOpen = useCallback(
      (index: number) => dispatch(openedRecipe(index)),
      [],
    );
    const onClose = useCallback(() => dispatch(openedRecipe(null)), []);
    const renderItem = useCallback<ListRenderItem<number>>(
      ({ item, index }) => (
        <Entry
          key={`entry-id-${item}`}
          index={index}
          onOpen={onOpen}
          onClose={onClose}
        />
      ),
      [],
    );
    const keyExtractor = useCallback((id: number) => `${id}`, []);
    const getItemLayout = useCallback(
      (data: ArrayLike<number> | null | undefined, index: number) => {
        return {
          length: ENTRY_HEIGHT,
          offset: ENTRY_HEIGHT * index,
          index,
        };
      },
      [],
    );

    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        data={collections[category].map((recipe) => recipe.id as number)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={collections[category].length}
        getItemLayout={getItemLayout}
      />
    );
  },
  _.isEqual,
);

const Root = styled.View({
  flex: 1,
  width: '100%',
});

const SearchContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1),
}));

const PiwiPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  top: 15,
  borderRadius: 0,
  borderTopLeftRadius: 30,
  flex: 1,
  alignItems: 'stretch',
  padding: 0,
  paddingTop: 30,
}));

const SortButtons = styled.View(({ theme }) => ({
  position: 'absolute',
  top: -20,
  flexDirection: 'row',
  alignItems: 'flex-end',
  alignSelf: 'center',
}));

const SortButton = styled(Button)<{ active?: boolean }>(
  ({ theme, active = false }) => ({
    borderRadius: 20,
    ...(!active && {
      backgroundColor: `${theme.palette.secondary.main}CC`,
      color: theme.palette.grey['300'],
    }),
  }),
);
