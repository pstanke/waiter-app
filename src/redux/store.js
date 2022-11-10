import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { initialState } from './initialState';
import { TablesReducer } from './tablesRedux';

const subReducers = {
  tables: TablesReducer,
};

const reducer = combineReducers(subReducers);
export const store = createStore(
  reducer,
  initialState,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
