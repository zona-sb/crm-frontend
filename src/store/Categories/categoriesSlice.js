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
    removeCurrentCategory: categoriesAdapter.removeOne,
    removeBulkCategories: categoriesAdapter.removeMany,
  },
});

export const categoriesSelector = categoriesAdapter.getSelectors(
  (state) => state.categories
);

export const {
  addNewCategory,
  updateCurrentCategory,
  removeCurrentCategory,
  getAllCategories,
  removeBulkCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
