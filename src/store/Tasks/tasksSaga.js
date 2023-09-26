import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import { getAllCategories } from '../Categories/categoriesSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';
import { addNewTask, getAllTasks } from './tasksSlice';

import { getAllStatuses } from '../Statuses/statusesSlice';

export function* getCategoriesSaga() {
  try {
    const payload = yield apiRequests.get(apiRoutes.categories());
    yield put(getAllCategories(payload.data));
  } catch (e) {
    console.log(e.message);
  }
}

export function* getStatusesSaga() {
  try {
    const payload = yield apiRequests.get(apiRoutes.statuses());
    yield put(getAllStatuses(payload.data));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}
export function* getTasksSaga(action) {
  const { id } = action.payload;
  console.log(id);
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

// export function* updateCategorySaga(action) {
//   yield put(setLoading(true));
//   const { id } = action.payload;
//   try {
//     const payload = yield apiRequests.put(
//       apiRoutes.modifyCategory(id),
//       action.payload
//     );
//     yield put(setStatus('success'));
//     yield put(
//       updateCurrentCategory({ id: payload.data.id, changes: payload.data })
//     );
//   } catch (_) {
//     yield put(setStatus('failed'));
//   }
// }

// export function* deleteCategorySaga(action) {
//   yield put(setLoading(true));
//   try {
//     yield apiRequests.delete(apiRoutes.categories(), action.payload);
//     yield put(setStatus('success'));
//     if (action.payload.deleteAll) {
//       yield put(removeAllCategories());
//     } else {
//       const { ids } = action.payload;
//       yield put(removeCategory(ids));
//     }
//   } catch (_) {
//     yield put(setStatus('failed'));
//   }
// }

export const GET_TASKS = 'getTasks';
export const getTasks = createAction(GET_TASKS);
export const ADD_TASK = 'addTask';
export const addTask = createAction(ADD_TASK);
export const GET_CATEGORIES = 'getCategories';
export const getCategories = createAction(GET_CATEGORIES);
export const GET_STATUSES = 'getStatuses';
export const getStatuses = createAction(GET_STATUSES);
// export const UPDATE_CATEGORY = 'updateCategory';
// export const updateCategory = createAction(UPDATE_CATEGORY);
// export const DELETE_CATEGORY = 'deleteCategory';
// export const deleteCategory = createAction(DELETE_CATEGORY);
