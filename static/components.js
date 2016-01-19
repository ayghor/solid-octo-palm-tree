import React from 'react';
import * as A from './actions';
import { store } from  './store';

function Link(props) {
	var x = {...props,
		onClick: (e) =>{
			var r = props.onClick(e);
			e.preventDefault();
			return r;
		}
	};

	return (
		<a {...x} />
	);
}

function IconButton(props) {
	var {icon, onClick} = props;

	return (
		<Link role="button" onClick={onClick}>
			<span className={"glyphicon glyphicon-" + icon} aria-hidden="true"></span>
		</Link>
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

function NewStuffCard(props) {
	var {onClick} = props;

	return (
		<Card>
			<h1 className="text-center">
				<IconButton icon="plus" onClick={ onClick } />
			</h1>
		</Card>
	);
}

function StuffCard(props) {
	var { id, text } = props;

	return (
		<Card>
			<textarea value = { text } />
		</Card>
	);
}

export function StuffGrid(props) {
	var { store } = props;
	var state = store.getState();

	console.log(state);

	var cards = state.stuffs.map(function (stuff) {
		return (
			<StuffCard key={ stuff.id } stuff={ stuff } />
		);
	});
	
	return (
		<div className="container">
			{ cards }
			<NewStuffCard onClick = { () => store.dispatch(A.createStuff()) } />
		</div>
	);
}