import React from 'react';
import ReactDOM from 'react-dom';
import { StuffGrid } from './components';
import { store } from './store';
import * as A from './actions';

function autoUpdate() {
	store.dispatch(A.readStuff());
	setTimeout(autoUpdate, 1000);
}

autoUpdate();

function render() {
	return ReactDOM.render(
		<StuffGrid store = { store } />,
		document.getElementById("root")
	);
}

store.subscribe(render);
render();