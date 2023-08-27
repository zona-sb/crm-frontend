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
    removeClient: clientsAdapter.removeMany,
    removeAllClients: (state) => {
      clientsAdapter.setAll(state, []);
    },
  },
});

export const clientsSelector = clientsAdapter.getSelectors(
  (state) => state.clients
);

export const {
  addNewClient,
  updateCurrentClient,
  removeClient,
  getAllClients,
  removeAllClients,
} = clientsSlice.actions;

export default clientsSlice.reducer;
