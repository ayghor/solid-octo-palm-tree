require('es6-promise').polyfill();
require('isomorphic-fetch');

export function createStuff({ text } = {}) {
	return fetch('/api/stuffs', {method: 'POST', body: text});
}

export function readAllStuff() {
	return fetch('/api/stuffs');
}

export function readStuff(id) {
	return fetch('/api/stuffs/' + id);
}

export function updateStuff(id, { text } = {}) {
	return fetch('/api/stuffs/' + id, {method: 'PATCH', body: text});
}

export function destroyStuff(id) {
	return fetch('/api/stuffs/ '+ id, {method: 'DELETE'});
}