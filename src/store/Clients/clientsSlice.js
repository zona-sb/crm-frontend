import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const clientsAdapter = createEntityAdapter();

const initialState = clientsAdapter.getInitialState();

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    getAllClients: clientsAdapter.addMany,
    addNewClient: clientsAdapter.addOne,
    updateCurrentClient: clientsAdapter.updateOne,
    removeCurrentClient: clientsAdapter.removeOne,
  },
});

export const clientsSelector = clientsAdapter.getSelectors(
  (state) => state.clients
);

export const {
  addNewClient,
  updateCurrentClient,
  removeCurrentClient,
  getAllClients,
} = clientsSlice.actions;

export default clientsSlice.reducer;
