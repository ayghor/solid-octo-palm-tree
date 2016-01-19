var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');

import './actions';
import './reducers';
import './store';

function render() {
	return ReactDOM.render(
		<StuffList stuffs={store.getState().stuffs}/>,
		document.getElementById("root")
	);
}

store.subscribe(render);
render();