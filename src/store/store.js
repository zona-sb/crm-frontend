import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { statusesSaga, prioritiesSaga, categoriesSaga } from './saga';
import prioritiesReducer from './Priorities/prioritiesSlice';
import categoriesReducer from './Categories/categoriesSlice';
import statusesReducer from './Statuses/statusesSlice';
import modalReducer from './Modal/ModalSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    statuses: statusesReducer,
    priorities: prioritiesReducer,
    categories: categoriesReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(statusesSaga);
sagaMiddleware.run(prioritiesSaga);
sagaMiddleware.run(categoriesSaga);

export default store;
