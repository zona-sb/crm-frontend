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
  ADD_STATUS,
  DELETE_STATUS,
  GET_STATUSES,
  UPDATE_STATUS,
  addStatusSaga,
  deleteStatusSaga,
  getStatusesSaga,
  updateStatusSaga,
} from './Statuses/statusesSaga';

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

export function* statusesSaga() {
  yield takeEvery(ADD_STATUS, addStatusSaga);
  yield takeEvery(GET_STATUSES, getStatusesSaga);
  yield takeEvery(UPDATE_STATUS, updateStatusSaga);
  yield takeEvery(DELETE_STATUS, deleteStatusSaga);
}
