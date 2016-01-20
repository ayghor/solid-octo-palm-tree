import { combineReducers } from 'redux';
import * as A from './actions';

function stuff(state = {}, action) {
}

function stuffs(state = {}, action) {
	switch (action.type) {

	case A.READ_STUFF:
		switch (action.status) {
			
			case A.OK:	
				var nextState = {};
				action.stuffs.forEach(x => nextState[x.id] = x);

				//console.log('refreshed');

				return nextState;
				
			case A.FAILED:
				//console.log('failed to refresh');

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
			//console.log("failed to create stuff");

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

	case A.CREATE_STUFF:
		switch (action.status) {

		case A.OK:

			//console.log("ASDASDASD", action);

			return {
				...state,
				dirty: true,
				text: action.stuff.text
			};

		default:
			break;
		}

	case A.CHANGE_STUFF:

		return {
			...state,
			dirty: true,
			text: action.text
		}

	case A.ROLLBACK_STUFF:

		return {
			...state,
			dirty: false
		};

	case A.UPDATE_STUFF:
		switch (action.status) {

			case A.OK:
				//console.log('updated stuff ' + action.id);

				return {
					...state,
					dirty: false
				};


			case A.PENDING:
				return {
					...state,
					dirty: true,
					lastRequestId: action.requestId
				}

			case A.FAILED:
				//console.log('failed to update stuff ' + action.id);

		}

	}
	return state;
}

function stuffsPendingUpdate(state = {}, action) {
	switch (action.type) {

	default:
		//console.log("STUFFS PENDING UPDATE", state);

		let pendingStuff = stuffPendingUpdate(state[action.id], action);

		if (pendingStuff !== state[action.id])
			return {
				...state,
				[action.id]: pendingStuff
			};

	}
	return state;
}

export const reducer = combineReducers({
	stuffsPendingUpdate,
	stuffsPendingCreate,
	stuffs,
});