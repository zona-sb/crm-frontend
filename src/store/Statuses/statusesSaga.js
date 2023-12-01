import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import {
  getAllStatuses,
  addNewStatus,
  updateCurrentStatus,
  removeAllStatuses,
  removeStatus,
  setIsLoading,
  setTotalPages,
  loadMoreStatuses,
  setCurrentPage,
} from './statusesSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';

export function* getStatusesSaga(action) {
  try {
    setIsLoading(true);
    const payload = yield apiRequests.get(apiRoutes.statuses(), action.payload);
    yield put(setCurrentPage(payload.data.number));
    if (action.payload.page > 1) {
      yield put(loadMoreStatuses(payload.data.content));
    } else {
      yield put(setTotalPages(payload.data.totalPages));
      yield put(getAllStatuses(payload.data.content));
    }
  } catch (e) {
    console.log(e.message);
  } finally {
    setIsLoading(false);
  }
}

export function* addStatusSaga(action) {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.post(
      apiRoutes.statuses(),
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
  try {
    yield apiRequests.delete(apiRoutes.statuses(), action.payload);
    yield put(setStatus('success'));
    if (action.payload.deleteAll) {
      yield put(removeAllStatuses());
    } else {
      const { ids } = action.payload;
      yield put(removeStatus(ids));
    }
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
