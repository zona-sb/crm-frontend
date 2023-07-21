import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import {
  addNewPriority,
  getAllPriorities,
  removeCurrentPriority,
  updateCurrentPriority,
} from './prioritiesSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';

export function* getPrioritiesSaga() {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.get(apiRoutes.getPriorities());
    yield put(getAllPriorities(payload.data));
  } catch (e) {}
}

export function* addPrioritySaga(action) {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.post(
      apiRoutes.addPriority(),
      action.payload
    );
    yield put(setStatus('success'));
    yield put(addNewPriority(payload.data));
  } catch (e) {
    yield put(setStatus('failed'));
  }
}

export function* updatePrioritySaga(action) {
  yield put(setLoading(true));
  const { id } = action.payload;
  try {
    const payload = yield apiRequests.put(
      apiRoutes.modifyPriority(id),
      action.payload
    );
    yield put(setStatus('success'));
    yield put(
      updateCurrentPriority({ id: payload.data.id, changes: payload.data })
    );
  } catch (e) {
    yield put(setStatus('failed'));
  }
}

export function* deletePrioritySaga(action) {
  yield put(setLoading(true));
  const id = action.payload;
  try {
    yield apiRequests.delete(apiRoutes.modifyPriority(id));
    yield put(setStatus('success'));
    yield put(removeCurrentPriority(id));
  } catch (e) {
    yield put(setStatus('failed'));
  }
}

export const GET_PRIORITIES = 'getPriorities';
export const getPriorities = createAction(GET_PRIORITIES);
export const ADD_PRIORITY = 'addPriority';
export const addPriority = createAction(ADD_PRIORITY);
export const UPDATE_PRIORITY = 'updatePriority';
export const updatePriority = createAction(UPDATE_PRIORITY);
export const DELETE_PRIORITY = 'deletePriority';
export const deletePriority = createAction(DELETE_PRIORITY);
