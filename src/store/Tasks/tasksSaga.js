import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import { getAllCategories } from '../Categories/categoriesSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';
import {
  addNewTask,
  getAllTasks,
  removeTask,
  updateCurrentTask,
} from './tasksSlice';

export function* getCategoriesSaga() {
  try {
    const payload = yield apiRequests.get(apiRoutes.categories());
    yield put(getAllCategories(payload.data));
  } catch (e) {
    console.log(e.message);
  }
}
export function* getTasksSaga(action) {
  const { id } = action.payload;
  try {
    const payload = yield apiRequests.get(apiRoutes.tasksAll(id));
    yield put(getAllTasks(payload.data));
  } catch (e) {
    console.log(e.message);
  }
}
export function* addTaskSaga(action) {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.post(apiRoutes.tasks(), action.payload);
    yield put(setStatus('success'));
    yield put(addNewTask(payload.data));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* updateTaskSaga(action) {
  yield put(setLoading(true));
  const { id, ...otherData } = action.payload;
  try {
    const payload = yield apiRequests.put(apiRoutes.modifyTask(id), otherData);
    yield put(setStatus('success'));
    yield put(
      updateCurrentTask({ id: payload.data.id, changes: payload.data })
    );
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* deleteTaskSaga(action) {
  yield put(setLoading(true));
  try {
    yield apiRequests.delete(apiRoutes.tasks(), action.payload);
    yield put(setStatus('success'));
    const { ids } = action.payload;
    yield put(removeTask(ids));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export const GET_TASKS = 'getTasks';
export const getTasks = createAction(GET_TASKS);
export const ADD_TASK = 'addTask';
export const addTask = createAction(ADD_TASK);
export const GET_CATEGORIES = 'getCategories';
export const getCategories = createAction(GET_CATEGORIES);
export const UPDATE_TASK = 'updateTask';
export const updateTask = createAction(UPDATE_TASK);
export const DELETE_TASK = 'deleteTask';
export const deleteTask = createAction(DELETE_TASK);
