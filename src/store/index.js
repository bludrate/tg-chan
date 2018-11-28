import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import logger from 'redux-logger';
import reducers from "../reducers";
import rememberAsyncActions from "../middlewares/rememberAsyncActions";

const middlewares = [ rememberAsyncActions ];

if (typeof window === 'undefined') {
  global.window = {
    isServer: true
  };
} else {
  middlewares.push( logger );
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = window.__INITIALSTATE__ || {};
const parameters = [ combineReducers( reducers ), initialState ];

parameters.push( composeEnhancers( applyMiddleware( ...middlewares ) ) );

export default () => {
  return createStore( ...parameters );
};
