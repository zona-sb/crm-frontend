import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import {
  addNewCategory,
  getAllCategories,
  removeAllCategories,
  removeCategory,
  updateCurrentCategory,
} from './categoriesSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';

export function* getCategoriesSaga(action) {
  try {
    const payload = yield apiRequests.get(
      apiRoutes.categories(),
      action.payload
    );
    yield put(getAllCategories(payload.data));
  } catch (e) {
    console.log(e.message);
  }
}

export function* addCategorySaga(action) {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.post(
      apiRoutes.categories(),
      action.payload
    );
    yield put(setStatus('success'));
    yield put(addNewCategory(payload.data));
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* updateCategorySaga(action) {
  yield put(setLoading(true));
  const { id } = action.payload;
  try {
    const payload = yield apiRequests.put(
      apiRoutes.modifyCategory(id),
      action.payload
    );
    yield put(setStatus('success'));
    yield put(
      updateCurrentCategory({ id: payload.data.id, changes: payload.data })
    );
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export function* deleteCategorySaga(action) {
  yield put(setLoading(true));
  try {
    yield apiRequests.delete(apiRoutes.categories(), action.payload);
    yield put(setStatus('success'));
    if (action.payload.deleteAll) {
      yield put(removeAllCategories());
    } else {
      const { ids } = action.payload;
      yield put(removeCategory(ids));
    }
  } catch (_) {
    yield put(setStatus('failed'));
  }
}

export const GET_CATEGORIES = 'getCategories';
export const getCategories = createAction(GET_CATEGORIES);
export const ADD_CATEGORY = 'addCategory';
export const addCategory = createAction(ADD_CATEGORY);
export const UPDATE_CATEGORY = 'updateCategory';
export const updateCategory = createAction(UPDATE_CATEGORY);
export const DELETE_CATEGORY = 'deleteCategory';
export const deleteCategory = createAction(DELETE_CATEGORY);
