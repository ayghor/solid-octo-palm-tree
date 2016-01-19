import React from 'react';
import './actions';
import './store';

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

export function Card(props) {
	return (
		<div className="col-xs-4">
			<div className="thumbnail">
				{props.children}
			</div>
		</div>
	);
}

function NewStuffCard(props) {
	{onClick} = props;

	return (
		<Card>
			<h1 className="text-center">
				<IconButton icon="plus" onClick={onClick} />
			</h1>
		</Card>
	);
}

function StuffCard(props) {
	var {id, text, new} = props;

	return (
		<Card>
			<textarea onChange={e => store.dispatch(updateStuff(id, text, new))}>
				text
			</textarea>
		</Card>
	);
}

function StuffGrid(props) {
	var {stuffs} = props;

	var cards = stuffs.map(function (stuff) {
		return (
			<StuffCard key={stuff.id} stuff={stuff} />
		);
	});
	
	return (
		<div className="container">
			{cards}
			<NewStuffCard />
		</div>
	);
}