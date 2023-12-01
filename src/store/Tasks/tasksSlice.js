import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

const taskssSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getAllTasks: tasksAdapter.setAll,
    addNewTask: tasksAdapter.addOne,
    updateCurrentTask: tasksAdapter.updateOne,
    setCorrectStatus: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.setCorrectStatus = payload;
    },
    removeTask: tasksAdapter.removeMany,
  },
});

export const tasksSelector = tasksAdapter.getSelectors((state) => state.tasks);

export const {
  addNewTask,
  setCorrectStatus,
  getAllTasks,
  updateCurrentTask,
  removeTask,
  getAllCategories,
} = taskssSlice.actions;

export default taskssSlice.reducer;
