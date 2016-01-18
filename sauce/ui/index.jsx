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

var EDIT_STUFF = 'EDIT_STUFF';

function editStuff(id) {
	return {
		type: EDIT_STUFF,
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

		case EDIT_STUFF:
			return state;

		default:
			return state;
	}
}

var store = createStore(reducer);
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());
store.dispatch(addStuff());

function IconButton(props) {
	var {icon, onClick} = props;
	return (
		<a href="#" role="button" onClick={onClick}>
			<span className={"glyphicon glyphicon-" + icon} aria-hidden="true"></span>
		</a>
	);
}

function Card(props) {
	return (
		<div className="col-xs-4">
			<div className="thumbnail">
				{props.children}
			</div>
		</div>
	);
}

function StuffCard(props) {
	var x = props.stuff;
	return (
		<Card>
			<div className="ar_wrapper ar_4_3_wrapper asd">
				<div className="ar_main">
					<img src={"/img/" + x.image_url} alt={x.name} />
				</div>
			</div>
			<div className="caption">
					
				<h3>
					{x.name}
					<span className="pull-right">
							<IconButton icon="edit" onClick={() => store.dispatch(editStuff(x.id))} />
							<IconButton icon="trash" onClick={() => store.dispatch(removeStuff(x.id))} />
					</span>
				</h3>

				<p>{x.description}</p>
			</div>
		</Card>
	);
};

function StuffList(props) {
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