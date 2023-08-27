import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import {
  addNewClient,
  getAllClients,
  removeAllClients,
  removeClient,
  updateCurrentClient,
} from './clientsSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';

export function* getClientsSaga() {
  try {
    const payload = yield apiRequests.get(apiRoutes.clients());
    yield put(getAllClients(payload.data));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* addClientSaga(action) {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.post(apiRoutes.clients(), action.payload);
    yield put(setStatus('success'));
    yield put(addNewClient(payload.data));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* updateClientSaga(action) {
  yield put(setLoading(true));
  const { id } = action.payload;
  try {
    const payload = yield apiRequests.put(
      apiRoutes.modifyClient(id),
      action.payload
    );
    yield put(setStatus('success'));
    yield put(
      updateCurrentClient({ id: payload.data.id, changes: payload.data })
    );
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* deleteClientSaga(action) {
  yield put(setLoading(true));
  try {
    yield apiRequests.delete(apiRoutes.clients(), action.payload);
    yield put(setStatus('success'));
    if (action.payload.deleteAll) {
      yield put(removeAllClients());
    } else {
      const { ids } = action.payload;
      yield put(removeClient(ids));
    }
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export const GET_CLIENTS = 'getClients';
export const getClients = createAction(GET_CLIENTS);
export const ADD_CLIENT = 'addClient';
export const addClient = createAction(ADD_CLIENT);
export const UPDATE_CLIENT = 'updateClient';
export const updateClient = createAction(UPDATE_CLIENT);
export const DELETE_CLIENT = 'deleteClient';
export const deleteClient = createAction(DELETE_CLIENT);
