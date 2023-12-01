/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const statusesAdapter = createEntityAdapter();

const initialState = statusesAdapter.getInitialState({
  isLoading: false,
  currentPage: null,
  totalPages: null,
});

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    getAllStatuses: (state, action) => {
      statusesAdapter.setAll(state, action.payload);
    },
    loadMoreStatuses: statusesAdapter.addMany,
    addNewStatus: statusesAdapter.addOne,
    updateCurrentStatus: statusesAdapter.updateOne,
    removeStatus: statusesAdapter.removeMany,
    removeAllStatuses: (state) => {
      statusesAdapter.setAll(state, []);
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

export const statusesSelector = statusesAdapter.getSelectors(
  (state) => state.statuses
);

export const {
  getAllStatuses,
  addNewStatus,
  updateCurrentStatus,
  removeStatus,
  removeAllStatuses,
  setIsLoading,
  setTotalPages,
  loadMoreStatuses,
  setCurrentPage,
} = statusesSlice.actions;

export default statusesSlice.reducer;
