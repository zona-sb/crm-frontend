/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
  isLoading: false,
  currentPage: null,
  totalPages: null,
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getAllCategories: (state, action) => {
      categoriesAdapter.setAll(state, action.payload);
    },
    loadMoreCategories: categoriesAdapter.addMany,
    addNewCategory: categoriesAdapter.addOne,
    updateCurrentCategory: categoriesAdapter.updateOne,
    removeCategory: categoriesAdapter.removeMany,
    removeAllCategories: (state) => {
      categoriesAdapter.setAll(state, []);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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
  loadMoreCategories,
  setCurrentPage,
  setIsLoading,
  setTotalPages,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
