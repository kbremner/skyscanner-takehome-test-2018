import { createStore } from 'redux';
import rootReducer from './reducer';
import middleware from './middleware';

export default () => createStore(rootReducer, middleware);