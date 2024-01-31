import React, { useContext, useMemo } from 'react';
import _ from 'lodash';
import { View, Image, Dimensions } from 'react-native';
import styled from '@emotion/native';
import RenderHtml from 'react-native-render-html';
import { usePage } from '../../../lib/Inertia';
import { useAppSelector } from '../../../src/hooks';
import { Recipe } from '../../../store/recipe';
import Typography from '../../../Piwi/material/Typography';
import { SERVER } from '../../../src/Vars';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
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
  const indexTemp = useMemo(() => openedRecipe as number, []);
  const recipe = collections[openedRecipeCategory][indexTemp];
  const html = useMemo(
    () => ({
      html: recipe.setup,
    }),
    [],
  );

  return (
    <>
      <RecipeImage
        source={{
          uri: `${SERVER}/getimage/image/${encodeURI(recipe.cover)}`,
        }}
      />
      <View style={{ padding: 12 }} />

      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <RenderHtml source={html} contentWidth={SCREEN_WIDTH} />
      </View>
    </>
  );
}, _.isEqual);

const RecipeImage = styled(Image)({
  width: 150,
  height: 150,
  objectFit: 'cover',
  borderRadius: 200,
  alignSelf: 'center',
  marginTop: 20,
});
