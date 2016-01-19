import * as API from './api';
import store from './store';

// dirty hacks
export const CHANGE_STUFF = 'CHANGE_VALUE';
export const ROLLBACK_STUFF = 'ROLLBACK_STUFF';

export const PENDING = 'PENDING';
export const OK = 'OK';
export const FAILED = 'FAILED';

var nextRequestId = 1;

function asd(p, dispatch, T, k, successAction = undefined, id = undefined) {
	var requestId = nextRequestId++;
	
	dispatch({
		type: T,
		status: PENDING,
		requestId,
		id
	});

	return p.then(function (res) {
		if (res.status !== 200)
			dispatch({
				type: T,
				status: FAILED,
				requestId,
				id
			});
		
		else
			res.json().then(j => {
				dispatch({
					type: T,
					status: OK,
					[k]: j,
					requestId,
					id
				});

				if (successAction)
					dispatch(successAction);
			});
	});
}

export const CREATE_STUFF = 'CREATE_STUFF';

export function createStuff() {
	return dispatch => asd(API.createStuff(), dispatch, CREATE_STUFF, 'stuff', readStuff());
}

export const READ_STUFF = 'READ_STUFF';

export function readStuff() {
	return dispatch => asd(API.readAllStuff(), dispatch, READ_STUFF, 'stuffs');
}

export const UPDATE_STUFF = 'UPDATE_STUFF';

export function updateStuff(id) {
	return (dispatch, getState) => asd(API.updateStuff(id, {text: getState().stuffsPendingUpdate[id].text}), dispatch, UPDATE_STUFF, 'stuff', readStuff(), id);
}

export function changeStuff(id, text) {
	console.log("CHANGE_STUFF", id, text);
	return {
		type: CHANGE_STUFF,
		id,
		text
	};
}

export function rollbackStuff(id) {
	return {
		type: ROLLBACK_STUFF,
		id
	};
}

export const DESTROY_STUFF = 'DESTROY_STUFF';

export function destroyStuff(id) {
	return dispatch => asd(API.destroyStuff(id), dispatch, DESTROY_STUFF, 'stuff', readStuff(), id);
}
