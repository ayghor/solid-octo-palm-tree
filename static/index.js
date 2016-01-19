import React from 'react';
import ReactDOM from 'react-dom';
import { StuffGrid } from './components';
import { store } from './store';
import * as A from './actions';

//store.dispatch(A.createStuff('asd'));

function render() {
	return ReactDOM.render(
		<StuffGrid store = { store } />,
		document.getElementById("root")
	);
}

store.subscribe(render);
render();