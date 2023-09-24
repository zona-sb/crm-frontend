import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const prioritiesAdapter = createEntityAdapter();

const initialState = prioritiesAdapter.getInitialState();

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
} = prioritiesSlice.actions;

export default prioritiesSlice.reducer;
