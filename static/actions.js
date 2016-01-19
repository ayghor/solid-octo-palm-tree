export const CREATE_STUFF = 'CREATE_STUFF';

export function createStuff() {
	return {
		type: CREATE_STUFF
	};
}

export const UPDATE_STUFF = 'UPDATE_STUFF'

export function updateStuff(id, values) {
	return {
		type: UPDATE_STUFF,
		id,
		values
	};
}

export const DESTROY_STUFF = 'DESTROY_STUFF';

export function destroyStuff(id) {
	return {
		type: DESTROY_STUFF,
		id
	};
}