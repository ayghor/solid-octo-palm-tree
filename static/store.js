import { createStore } from 'redux';
import './reducers.js';

export var store = createStore(rootReducer);