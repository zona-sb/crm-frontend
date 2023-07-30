import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  statusesSaga,
  prioritiesSaga,
  categoriesSaga,
  workersSaga,
  clientsSaga,
} from './saga';
import prioritiesReducer from './Priorities/prioritiesSlice';
import categoriesReducer from './Categories/categoriesSlice';
import statusesReducer from './Statuses/statusesSlice';
import workersReducer from './Workers/workersSlice';
import clientsReducer from './Clients/clientsSlice';
import modalReducer from './Modal/ModalSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    statuses: statusesReducer,
    priorities: prioritiesReducer,
    categories: categoriesReducer,
    workers: workersReducer,
    clients: clientsReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(statusesSaga);
sagaMiddleware.run(prioritiesSaga);
sagaMiddleware.run(categoriesSaga);
sagaMiddleware.run(workersSaga);
sagaMiddleware.run(clientsSaga);

export default store;
