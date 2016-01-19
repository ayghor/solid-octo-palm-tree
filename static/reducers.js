import { combineReducers } from 'redux'
import './actions';

export function stuff(state = {}, action) {
	switch (action.type) {
		case CREATE_STUFF:
		case UPDATE_STUFF:
			state = {
				...state,
				pending: true,
				text: action.text
			}

			return state;

		default:
			return state;
	}
}

export function stuffs(state = [], action) {
	switch (action.type) {
		case CREATE_STUFF:
			state.stuffs = [
				...state.stuffs,
				stuff(state, action)
			];
			return state;

		case UPDATE_STUFF:
			let i = state.find(x => x.id === action.id);
			state = [
				...state.slice(0, i),
				stuff(state[i], action),
				...state.slice(i)
			];
			return state;

		default:
			return state;
	}
}

export function fetchStuffs() {
}

export function receiveStuff() {
}

const rootReducer = combineReducers({
	stuffs,
	stuff,
});