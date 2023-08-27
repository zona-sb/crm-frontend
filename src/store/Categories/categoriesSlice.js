import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState();

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getAllCategories: categoriesAdapter.addMany,
    addNewCategory: categoriesAdapter.addOne,
    updateCurrentCategory: categoriesAdapter.updateOne,
    removeCategory: categoriesAdapter.removeMany,
    removeAllCategories: (state) => {
      categoriesAdapter.setAll(state, []);
    },
  },
});

export const categoriesSelector = categoriesAdapter.getSelectors(
  (state) => state.categories
);

export const {
  addNewCategory,
  updateCurrentCategory,
  removeCategory,
  getAllCategories,
  removeBulkCategories,
  removeAllCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
