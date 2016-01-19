import { combineReducers } from 'redux';
import * as A from './actions';

function stuff(state = {}, action) {
}

function stuffs(state = [], action) {
	switch (action.type) {

	case A.READ_STUFF:
		switch (action.status) {
			
			case A.OK:
				console.log('refreshed');
				return action.stuffs;
				
			case A.FAILED:
				console.log('failed to refresh');

			case A.PENDING:

		}

	}
	return state;
}

function stuffsPendingCreate(state = 0, action) {
	switch (action.type) {

	case A.CREATE_STUFF:
		switch (action.status) {

		case A.FAILED:
			console.log("failed to create stuff");

		case A.OK:
				return state - 1;

		case A.PENDING:
				return state + 1;

		}

	}
	return state;
}

function stuffPendingUpdate(state = {}, action) {
	switch (action.type) {

	case A.UPDATE_STUFF:
		switch (action.status) {

			case A.OK:
				console.log('updated stuff ' + action.id);
				return action.requestId < state.lastRequestId ? state : undefined;

			case A.PENDING:
				return {
					text: action.text,
					lastRequestId: action.requestId
				}

			case A.FAILED:
				console.log('failed to update stuff ' + action.id);

		}

	}
	return state;
}

function stuffsPendingUpdate(state = {}, action) {
	switch (action.type) {

	case A.UPDATE_STUFF:
		var nextState = {
			...state,
			[action.id]: stuffPendingUpdate(state[action.id], action)
		};

		if (nextState[action.id] === undefined)
			delete nextState[action.id];

		return nextState;

	}
	return state;
}

export const reducer = combineReducers({
	stuffsPendingUpdate,
	stuffsPendingCreate,
	stuffs,
});