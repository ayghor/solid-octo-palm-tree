import { combineReducers } from 'redux';
import * as A from './actions';

function stuff(state = {}, action) {
	switch (action.type) {
		case A.CREATE_STUFF:
		case A.UPDATE_STUFF:
			state = {
				...state,
				text: action.text
			}

			return state;

		default:
			return state;
	}
}

function stuffs(state = [], action) {
	switch (action.type) {
		case A.CREATE_STUFF:
			return [
				...state,
				stuff(state, action)
			];

		case A.UPDATE_STUFF:
			let i = state.find(x => x.id === action.id);

			return [
				...state.slice(0, i),
				stuff(state[i], action),
				...state.slice(i)
			];

		default:
			return state;
	}
}

export const reducer = combineReducers({
	stuffs
});