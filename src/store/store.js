import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { prioritiesSaga, categoriesSaga, workersSaga } from './saga';
import prioritiesReducer from './Priorities/prioritiesSlice';
import categoriesReducer from './Categories/categoriesSlice';
import workersReducer from './Workers/workersSlice';
import modalReducer from './Modal/ModalSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    priorities: prioritiesReducer,
    categories: categoriesReducer,
    workers: workersReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(prioritiesSaga);
sagaMiddleware.run(categoriesSaga);
sagaMiddleware.run(workersSaga);

export default store;
