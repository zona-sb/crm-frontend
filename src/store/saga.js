/* eslint-disable import/prefer-default-export */

import { takeEvery } from 'redux-saga/effects';
import {
  ADD_PRIORITY,
  DELETE_PRIORITY,
  GET_PRIORITIES,
  UPDATE_PRIORITY,
  addPrioritySaga,
  deletePrioritySaga,
  getPrioritiesSaga,
  updatePrioritySaga,
} from './Priorities/prioritiesSaga';
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  addCategorySaga,
  deleteCategorySaga,
  getCategoriesSaga,
  updateCategorySaga,
} from './Categories/categoriesSaga';
import {
  ADD_WORKER,
  DELETE_WORKER,
  GET_WORKERS,
  UPDATE_WORKER,
  addWorkerSaga,
  deleteWorkerSaga,
  getWorkersSaga,
  updateWorkerSaga,
} from './Workers/workersSaga';

export function* prioritiesSaga() {
  yield takeEvery(ADD_PRIORITY, addPrioritySaga);
  yield takeEvery(GET_PRIORITIES, getPrioritiesSaga);
  yield takeEvery(UPDATE_PRIORITY, updatePrioritySaga);
  yield takeEvery(DELETE_PRIORITY, deletePrioritySaga);
}
export function* categoriesSaga() {
  yield takeEvery(ADD_CATEGORY, addCategorySaga);
  yield takeEvery(GET_CATEGORIES, getCategoriesSaga);
  yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
  yield takeEvery(DELETE_CATEGORY, deleteCategorySaga);
}
export function* workersSaga() {
  yield takeEvery(ADD_WORKER, addWorkerSaga);
  yield takeEvery(GET_WORKERS, getWorkersSaga);
  yield takeEvery(UPDATE_WORKER, updateWorkerSaga);
  yield takeEvery(DELETE_WORKER, deleteWorkerSaga);
}
