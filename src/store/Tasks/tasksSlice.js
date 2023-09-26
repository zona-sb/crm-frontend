import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

const taskssSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getAllTasks: tasksAdapter.addMany,
    addNewTask: tasksAdapter.addOne,
    setCorrectStatus: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.setCorrectStatus = payload;
    },
    // getCorrectStatus: (state, { payload }) => {
    //  return state.setCorrectStatus = payload;
    // },
    // updateCurrentCategory: categoriesAdapter.updateOne,
    // removeCategory: categoriesAdapter.removeMany,
    // removeAllCategories: (state) => {
    //   categoriesAdapter.setAll(state, []);
    // },
  },
});

export const tasksSelector = tasksAdapter.getSelectors((state) => state.tasks);

export const {
  addNewTask,
  setCorrectStatus,
  getAllTasks,
  // updateCurrentCategory,
  // removeCategory,
  getAllCategories,
  // removeBulkCategories,
  // removeAllCategories,
} = taskssSlice.actions;

export default taskssSlice.reducer;
