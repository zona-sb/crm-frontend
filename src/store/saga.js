/* eslint-disable import/prefer-default-export */

import { takeEvery } from 'redux-saga/effects';
import {
  ADD_PRIORITY,
  DELETE_BULK_PRIORITIES,
  DELETE_PRIORITY,
  GET_PRIORITIES,
  UPDATE_PRIORITY,
  addPrioritySaga,
  deleteBulkPrioritiesSaga,
  deletePrioritySaga,
  getPrioritiesSaga,
  updatePrioritySaga,
} from './Priorities/prioritiesSaga';
import {
  ADD_CATEGORY,
  DELETE_BULK_CATEGORIES,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  addCategorySaga,
  deleteBulkCategoriesSaga,
  deleteCategorySaga,
  getCategoriesSaga,
  updateCategorySaga,
} from './Categories/categoriesSaga';
import {
  ADD_STATUS,
  DELETE_BULK_STATUSES,
  DELETE_STATUS,
  GET_STATUSES,
  UPDATE_STATUS,
  addStatusSaga,
  deleteBulkStatusesSaga,
  deleteStatusSaga,
  getStatusesSaga,
  updateStatusSaga,
} from './Statuses/statusesSaga';
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
import {
  ADD_CLIENT,
  DELETE_CLIENT,
  GET_CLIENTS,
  UPDATE_CLIENT,
  addClientSaga,
  deleteClientSaga,
  getClientsSaga,
  updateClientSaga,
} from './Clients/clientsSaga';

export function* prioritiesSaga() {
  yield takeEvery(ADD_PRIORITY, addPrioritySaga);
  yield takeEvery(GET_PRIORITIES, getPrioritiesSaga);
  yield takeEvery(UPDATE_PRIORITY, updatePrioritySaga);
  yield takeEvery(DELETE_PRIORITY, deletePrioritySaga);
  yield takeEvery(DELETE_BULK_PRIORITIES, deleteBulkPrioritiesSaga);
}
export function* categoriesSaga() {
  yield takeEvery(ADD_CATEGORY, addCategorySaga);
  yield takeEvery(GET_CATEGORIES, getCategoriesSaga);
  yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
  yield takeEvery(DELETE_CATEGORY, deleteCategorySaga);
  yield takeEvery(DELETE_BULK_CATEGORIES, deleteBulkCategoriesSaga);
}
export function* statusesSaga() {
  yield takeEvery(ADD_STATUS, addStatusSaga);
  yield takeEvery(GET_STATUSES, getStatusesSaga);
  yield takeEvery(UPDATE_STATUS, updateStatusSaga);
  yield takeEvery(DELETE_STATUS, deleteStatusSaga);
  yield takeEvery(DELETE_BULK_STATUSES, deleteBulkStatusesSaga);
}
export function* workersSaga() {
  yield takeEvery(ADD_WORKER, addWorkerSaga);
  yield takeEvery(GET_WORKERS, getWorkersSaga);
  yield takeEvery(UPDATE_WORKER, updateWorkerSaga);
  yield takeEvery(DELETE_WORKER, deleteWorkerSaga);
}
export function* clientsSaga() {
  yield takeEvery(ADD_CLIENT, addClientSaga);
  yield takeEvery(GET_CLIENTS, getClientsSaga);
  yield takeEvery(UPDATE_CLIENT, updateClientSaga);
  yield takeEvery(DELETE_CLIENT, deleteClientSaga);
}
