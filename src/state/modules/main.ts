import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainState {
  replaceMeState: number[];
}

const initialState: MainState = {
  replaceMeState: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    replaceMeAction: (
      state,
      action: PayloadAction<MainState['replaceMeState']>
    ) => {
      state.replaceMeState = action.payload;
    },
  },
});

export const { replaceMeAction } = mainSlice.actions;

export default mainSlice.reducer;
