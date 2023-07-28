import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import {
  getAllStatuses,
  addNewStatus,
  updateCurrentStatus,
  removeCurrentStatus,
} from './statusesSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';

export function* getStatusesSaga() {
  try {
    const payload = yield apiRequests.get(apiRoutes.getStatuses());
    yield put(getAllStatuses(payload.data));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* addStatusSaga(action) {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.post(
      apiRoutes.addStatus(),
      action.payload
    );
    yield put(setStatus('success'));
    yield put(addNewStatus(payload.data));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* updateStatusSaga(action) {
  yield put(setLoading(true));
  const { id } = action.payload;
  try {
    const payload = yield apiRequests.put(
      apiRoutes.modifyStatus(id),
      action.payload
    );
    yield put(setStatus('success'));
    yield put(
      updateCurrentStatus({ id: payload.data.id, changes: payload.data })
    );
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* deleteStatusSaga(action) {
  yield put(setLoading(true));
  const id = action.payload;
  try {
    yield apiRequests.delete(apiRoutes.modifyStatus(id));
    yield put(setStatus('success'));
    yield put(removeCurrentStatus(id));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export const GET_STATUSES = 'getStatuses';
export const getStatuses = createAction(GET_STATUSES);
export const ADD_STATUS = 'addStatus';
export const addStatus = createAction(ADD_STATUS);
export const UPDATE_STATUS = 'updateStatus';
export const updateStatus = createAction(UPDATE_STATUS);
export const DELETE_STATUS = 'deleteStatus';
export const deleteStatus = createAction(DELETE_STATUS);
