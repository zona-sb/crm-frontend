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
    removeWorker: workersAdapter.removeMany,
    removeAllWorkers: (state) => {
      workersAdapter.setAll(state, []);
    },
  },
});

export const workersSelector = workersAdapter.getSelectors(
  (state) => state.workers
);

export const {
  addNewWorker,
  updateCurrentWorker,
  removeWorker,
  getAllWorkers,
  removeAllWorkers,
} = workersSlice.actions;

export default workersSlice.reducer;
