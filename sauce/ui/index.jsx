var React = require('react');
var ReactDOM = require('react-dom');
var { createStore } = require('redux');
var { Provider } = require('react-redux');

var ADD_STUFF = 'ADD_STUFF';
var nextId = 1;

function addStuff(
	name = "stuff #" + nextId,
	description = "some desc for " + name,
	image_url = "longcat.jpg"
	) {
	return {
		type: ADD_STUFF,
		id: nextId++,
		name,
		description,
		image_url
	};
}

var REMOVE_STUFF = 'REMOVE_STUFF';

function removeStuff(id) {
	return {
		type: REMOVE_STUFF,
		id
	}
}

function reducer(state = {stuffs: []}, action) {
	switch(action.type) {
		case ADD_STUFF:
			var {type, id, name, description, image_url} = action;
			state.stuffs = [...state.stuffs, {type, id, name, description, image_url}];
			return state;

		case REMOVE_STUFF:
			state = {...state, stuffs: state.stuffs.filter(function(x) { return x.id !== action.id})};
			return state;

		default:
			return state;
	}
}

store = createStore(reducer);
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());

StuffCard = function (props) {
	var x = props.stuff;
	return (
		<div className="col-xs-4">
			<div className="thumbnail">
				<div className="ar_wrapper ar_4_3_wrapper asd">
					<div className="ar_main">
						<img src={"/img/" + x.image_url} alt={x.name} />
					</div>
				</div>
				<div className="caption">
					<h3>{x.name}</h3>
					<p>{x.description}</p>
					<p>
						<a href="#" className="btn btn-primary" role="button">Button</a>
						<a href="#" className="btn btn-default" role="button">Button</a>
						<a href="#" className="btn btn-danger" role="button" onClick={() => store.dispatch(removeStuff(x.id))}>Remove</a>
					</p>
				</div>
			</div>
		</div>
	);
};

StuffList = function (props) {
	xs = props.stuffs;
	return (
		<div className="container">
			{xs.map(function (x) {
				return (<StuffCard key={x.id} stuff={x} />);
			})}
		</div>
	);
}

function render() {
	return ReactDOM.render(
		<StuffList stuffs={store.getState().stuffs}/>,
		document.getElementById("root")
	);
}

store.subscribe(render);
render();