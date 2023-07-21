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
      state.isModalShow = true;
      state.isLoading = false;
      state.status = 'idle';
    },
    close: (state) => {
      state.isModalShow = false;
    },
  },
});

export const { setCurrentType, setStatus, setLoading, close } =
  modalSlice.actions;

export default modalSlice.reducer;
