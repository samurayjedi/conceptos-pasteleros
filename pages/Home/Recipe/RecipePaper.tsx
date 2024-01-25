import React, { useState, useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import styled from '@emotion/native';
import _ from 'lodash';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Recipe } from '../../../store/recipe';
import Typography from '../../../Piwi/material/Typography';
import IconButton from '../../../Piwi/material/IconButton';
import PreparationTable from './PreparationTable';
import RecipeSetup from './RecipeSetup';
import Paper from '../../../Piwi/material/Paper';
import { useAppSelector } from '../../../src/hooks';
import { usePage } from '../../../lib/Inertia';

export default React.memo(() => {
  const openedRecipe = useAppSelector((state) => state.recipe.openedRecipe);
  const openedRecipeCategory = useAppSelector(
    (state) => state.recipe.openedRecipeCategory,
  );
  const collections = usePage().props as unknown as {
    basics: Recipe[];
    classics: Recipe[];
    gourmet: Recipe[];
  };
  const recipe = collections[openedRecipeCategory][openedRecipe || 0];
  if (!recipe) {
    throw new Error(`[${openedRecipeCategory}][${openedRecipe}] not found`);
  }

  const [index, setIndex] = useState(0);
  const onPrev = useCallback(
    () => setIndex((prev) => (prev > 0 ? prev - 1 : prev)),
    [],
  );
  const onNext = useCallback(
    () =>
      setIndex((prev) =>
        prev < recipe.preparations.length - (recipe.setup === null ? 1 : 0)
          ? prev + 1
          : 0,
      ),
    [],
  );

  return (
    <Card>
      <Typography
        variant="subtitle1"
        align="center"
        style={{
          padding: 10,
          backgroundColor: '#1976d2',
          color: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {recipe.preparations[index].name}
      </Typography>
      <PagerContainer>
        <Typography variant="subtitle1" color="primary">
          Page {index + 1} of{' '}
          {recipe.setup === null
            ? recipe.preparations.length
            : recipe.preparations.length + 1}
        </Typography>
        <View style={{ flex: 1 }} />
        <IconButton size="small" onPressIn={onPrev}>
          <FontAwesome name="chevron-left" />
        </IconButton>
        <IconButton size="small" onPressIn={onNext}>
          <FontAwesome name="chevron-right" />
        </IconButton>
      </PagerContainer>
      <ScrollView>
        {index === recipe.preparations.length ? (
          <RecipeSetup />
        ) : (
          <PreparationTable preparation={recipe.preparations[index]} />
        )}
      </ScrollView>
    </Card>
  );
}, _.isEqual);

const PagerContainer = styled.View({
  paddingTop: 20,
  paddingBottom: 10,
  paddingLeft: 20,
  flexDirection: 'row',
});

const Card = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: 30,
  flex: 1,
  padding: 0,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));
