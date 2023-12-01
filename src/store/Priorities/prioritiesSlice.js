import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const prioritiesAdapter = createEntityAdapter();

const initialState = prioritiesAdapter.getInitialState({
  isLoading: false,
  currentPage: null,
  totalPages: null,
});

const prioritiesSlice = createSlice({
  name: 'priorities',
  initialState,
  reducers: {
    getAllPriorities: (state, action) => {
      prioritiesAdapter.setAll(state, action.payload);
    },
    loadMorePriorities: prioritiesAdapter.addMany,
    addNewPriority: prioritiesAdapter.addOne,
    updateCurrentPriority: prioritiesAdapter.updateOne,
    removePriority: prioritiesAdapter.removeMany,
    removeAllPriorities: (state) => {
      prioritiesAdapter.setAll(state, []);
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

export const prioritiesSelector = prioritiesAdapter.getSelectors(
  (state) => state.priorities
);

export const {
  addNewPriority,
  updateCurrentPriority,
  removePriority,
  getAllPriorities,
  removeAllPriorities,
  loadMorePriorities,
  setCurrentPage,
  setIsLoading,
  setTotalPages,
} = prioritiesSlice.actions;

export default prioritiesSlice.reducer;
