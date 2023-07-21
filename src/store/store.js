import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { prioritiesSaga } from './saga';
import prioritiesReducer from './Priorities/prioritiesSlice';
import modalReducer from './Modal/ModalSlice';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    priorities: prioritiesReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(prioritiesSaga);

export default store;
