import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';

const createStore2 = applyMiddleware(thunk)(createStore);
export const store = createStore2(reducer);