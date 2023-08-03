import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const statusesAdapter = createEntityAdapter();

const initialState = statusesAdapter.getInitialState();

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    getAllStatuses: statusesAdapter.addMany,
    addNewStatus: statusesAdapter.addOne,
    updateCurrentStatus: statusesAdapter.updateOne,
    removeCurrentStatus: statusesAdapter.removeOne,
  },
});

export const statusesSelector = statusesAdapter.getSelectors(
  (state) => state.statuses
);

export const {
  getAllStatuses,
  addNewStatus,
  updateCurrentStatus,
  removeCurrentStatus,
} = statusesSlice.actions;

export default statusesSlice.reducer;
