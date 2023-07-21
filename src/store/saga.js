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

export function* prioritiesSaga() {
  yield takeEvery(ADD_PRIORITY, addPrioritySaga);
  yield takeEvery(GET_PRIORITIES, getPrioritiesSaga);
  yield takeEvery(UPDATE_PRIORITY, updatePrioritySaga);
  yield takeEvery(DELETE_PRIORITY, deletePrioritySaga);
}
