import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import {
  addNewWorker,
  getAllWorkers,
  removeAllWorkers,
  removeWorker,
  updateCurrentWorker,
} from './workersSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';

export function* getWorkersSaga() {
  try {
    const payload = yield apiRequests.get(apiRoutes.workers());
    yield put(getAllWorkers(payload.data));
  } catch (e) {
    console.log(e.message);
  }
}

export function* addWorkerSaga(action) {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.post(apiRoutes.workers(), action.payload);
    yield put(setStatus('success'));
    yield put(addNewWorker(payload.data));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* updateWorkerSaga(action) {
  yield put(setLoading(true));
  const { id } = action.payload;
  try {
    const payload = yield apiRequests.put(
      apiRoutes.modifyWorker(id),
      action.payload
    );
    yield put(setStatus('success'));
    yield put(
      updateCurrentWorker({ id: payload.data.id, changes: payload.data })
    );
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* deleteWorkerSaga(action) {
  yield put(setLoading(true));
  try {
    yield apiRequests.delete(apiRoutes.workers(), action.payload);
    yield put(setStatus('success'));
    if (action.payload.deleteAll) {
      yield put(removeAllWorkers());
    } else {
      const { ids } = action.payload;
      yield put(removeWorker(ids));
    }
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export const GET_WORKERS = 'getWorkers';
export const getWorkers = createAction(GET_WORKERS);
export const ADD_WORKER = 'addWorker';
export const addWorker = createAction(ADD_WORKER);
export const UPDATE_WORKER = 'updateWorker';
export const updateWorker = createAction(UPDATE_WORKER);
export const DELETE_WORKER = 'deleteWorker';
export const deleteWorker = createAction(DELETE_WORKER);
