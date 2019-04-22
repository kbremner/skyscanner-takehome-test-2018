import { applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
  apiMiddleware,
];

export default composeEnhancers(applyMiddleware(...middleware));