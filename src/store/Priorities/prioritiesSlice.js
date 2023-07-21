import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const prioritiesAdapter = createEntityAdapter();

const initialState = prioritiesAdapter.getInitialState();

const prioritiesSlice = createSlice({
  name: 'priorities',
  initialState,
  reducers: {
    getAllPriorities: prioritiesAdapter.addMany,
    addNewPriority: prioritiesAdapter.addOne,
    updateCurrentPriority: prioritiesAdapter.updateOne,
    removeCurrentPriority: prioritiesAdapter.removeOne,
  },
});

export const prioritiesSelector = prioritiesAdapter.getSelectors(
  (state) => state.priorities
);

export const {
  addNewPriority,
  updateCurrentPriority,
  removeCurrentPriority,
  getAllPriorities,
} = prioritiesSlice.actions;

export default prioritiesSlice.reducer;
