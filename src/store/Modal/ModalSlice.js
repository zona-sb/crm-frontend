/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  isLoading: false,
  data: {},
  isModalShow: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setCurrentType: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.status = 'idle';
    },
    openModal: (state) => {
      state.isModalShow = true;
    },
    closeModal: (state) => {
      state.isModalShow = false;
    },
  },
});

export const { setCurrentType, setStatus, setLoading, openModal, closeModal } =
  modalSlice.actions;

export default modalSlice.reducer;
