import * as API from './api';
import store from './store';

export const PENDING = 'PENDING';
export const OK = 'OK';
export const FAILED = 'FAILED';

function asd(p, dispatch, T, k) {
	return p.then(function (res) {
		if (res.status !== 200)
			dispatch({
				type: T,
				status: FAILED
			});
		
		else
			res.json().then(j => {
				var a = {
					type: T,
					status: OK,
					[k]: j
				};

				dispatch(a);

				console.log('a', a);
				}
			);
	});
}

export const CREATE_STUFF = 'CREATE_STUFF';

export function createStuff() {
	return dispatch => asd(API.createStuff(), dispatch, CREATE_STUFF, 'stuff');
}

export const READ_STUFF = 'READ_STUFF';

export function readStuff() {
	return dispatch => asd(API.readAllStuff(), dispatch, READ_STUFF, 'stuffs');
}

export const UPDATE_STUFF = 'UPDATE_STUFF';

export function updateStuff(id, values) {
	return dispatch => asd(API.updateStuff(id, values), dispatch, UPDATE_STUFF, 'stuff');
}

export const DESTROY_STUFF = 'DESTROY_STUFF';

export function destroyStuff(id) {
	return dispatch => asd(API.DESTROYStuff(id), dispatch, DESTROY_STUFF, 'stuff');
}
