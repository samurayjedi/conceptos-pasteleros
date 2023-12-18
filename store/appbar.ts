import React from 'react';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AppbarState = {
  content: null,
};

export const appbarSlice = createSlice({
  name: 'appbar',
  initialState,
  reducers: {
    changeContent: (state, action: PayloadAction<AppbarState['content']>) => {
      state.content = action.payload;
    },
  },
});

export const { changeContent } = appbarSlice.actions;

export default appbarSlice.reducer;

export interface AppbarState {
  content: {
    el: (props: any) => React.ReactNode;
    props: any;
  } | null;
}
