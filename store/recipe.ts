import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: RecipeState = {
  preparations: 1,
  openedRecipe: null,
  openedRecipeCategory: 'basics',
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    changePreparationsToMake: (
      state,
      action: PayloadAction<RecipeState['preparations']>,
    ) => {
      state.preparations = action.payload;
    },
    openedRecipe: (
      state,
      action: PayloadAction<RecipeState['openedRecipe']>,
    ) => {
      state.openedRecipe = action.payload;
    },
    openedRecipeCategory: (
      state,
      action: PayloadAction<RecipeState['openedRecipeCategory']>,
    ) => {
      state.openedRecipeCategory = action.payload;
    },
  },
});

export const { changePreparationsToMake, openedRecipe, openedRecipeCategory } =
  recipeSlice.actions;

export default recipeSlice.reducer;

export interface RecipeState {
  preparations: number;
  openedRecipe: number | null;
  openedRecipeCategory: Category['slug'];
}

export interface Category {
  id: number;
  label: string;
  slug: 'basics' | 'classics' | 'gourmet';
  create_at: string;
  update_at: string;
}

export interface Preparation {
  id: number;
  name: string;
  ingredients: Array<{ name: string; weight: string }>;
  instructions: string;
  id_recipe: number;
  create_at: string;
  update_at: string;
}

export interface Recipe {
  id: number;
  cover: string;
  name: string;
  setup: string;
  premium: string;
  cost: string;
  create_at: string;
  update_at: string;
  categories: Category[];
  preparations: Preparation[];
}
