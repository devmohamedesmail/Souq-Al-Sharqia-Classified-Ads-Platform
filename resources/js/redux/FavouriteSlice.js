import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of ad IDs or ad objects
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      // Prevent duplicates
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavourites: (state) => {
      state.items = [];
    }
  },
});

export const { addFavourite, removeFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;