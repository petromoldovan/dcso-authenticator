import ReduxThunk from 'redux-thunk';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
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
  //middleware: applyMiddleware.apply(undefined, middlewares)
});

export default store;
