import { put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiRequests from '../../utils/apiRequests';
import {
  addNewCategory,
  getAllCategories,
  removeCurrentCategory,
  updateCurrentCategory,
} from './categoriesSlice';
import { apiRoutes } from '../../utils/routes';
import { setLoading, setStatus } from '../Modal/ModalSlice';

export function* getCategoriesSaga() {
  try {
    const payload = yield apiRequests.get(apiRoutes.getCategories());
    yield put(getAllCategories(payload.data));
  } catch (e) {
    console.log(e.message);
  }
}

export function* addCategorySaga(action) {
  yield put(setLoading(true));
  try {
    const payload = yield apiRequests.post(
      apiRoutes.addCategory(),
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
  const id = action.payload;
  try {
    yield apiRequests.delete(apiRoutes.modifyCategory(id));
    yield put(setStatus('success'));
    yield put(removeCurrentCategory(id));
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
