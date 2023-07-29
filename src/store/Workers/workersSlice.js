import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const workersAdapter = createEntityAdapter();

const initialState = workersAdapter.getInitialState();

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    getAllWorkers: workersAdapter.addMany,
    addNewWorker: workersAdapter.addOne,
    updateCurrentWorker: workersAdapter.updateOne,
    removeCurrentWorker: workersAdapter.removeOne,
  },
});

export const workersSelector = workersAdapter.getSelectors(
  (state) => state.workers
);

export const {
  addNewWorker,
  updateCurrentWorker,
  removeCurrentWorker,
  getAllWorkers,
} = workersSlice.actions;

export default workersSlice.reducer;
