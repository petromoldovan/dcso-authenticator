import ReduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import {createLogger} from 'redux-logger';

import coreReducer from '../reducers';
import LoadLsData from '../middlewares/LoadLsData';

const shouldLog = __DEV__;
const middlewares = [ReduxThunk, LoadLsData];

if (shouldLog) {
  const loggerMiddleware = createLogger({
    stateTransformer: state => state.toJS()
  });

  middlewares.push(loggerMiddleware);
}

const store = configureStore({
  reducer: coreReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export default store;
