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
				<div className='ar-wrapper'>
					<div className='ar-main'>
						{props.children}
					</div>
				</div>
			</div>
		</div>
	);
}

function NewStuffCard(props) {
	var {onClick} = props;

	return (
		<Card>
			<h1 className = 'new-stuff-card'>
				<IconButton icon="plus" onClick={ onClick } />
			</h1>
		</Card>
	);
}

function StuffCard(props) {
	var { id, stuff, pendingStuff, onChange, onRollback, onCommit, onTrash } = props;
	var controls, content;

	console.log('pendingStuff', pendingStuff);

	if (pendingStuff && pendingStuff.dirty) {
		controls = (
			<span>
				<IconButton icon = 'ok' onClick = { onCommit } />
				<IconButton icon = 'remove' onClick = { onRollback } />
			</span>
		);

		content = (
			<textarea value = { pendingStuff.text } onChange = { onChange } />
		);
	}

	else {
		controls = (
			<span>
				<IconButton icon = 'edit' onClick = { () => onChange({target: {value: stuff.text /* omg */}}) } />
				<IconButton icon = 'trash' onClick = { onTrash } />
			</span>
		);

		content = (
			<p> { stuff.text } </p>
		);
	}


	return (
		<Card>
			<div className = 'stuff-card-controls'>
				{controls}
			</div>
			<div className = 'stuff-card-content'>
				{content}
			</div>
		</Card>
	);
}

export function StuffGrid(props) {
	var { store } = props;
	var state = store.getState();

	console.log(state);

	var cards = [];

	for (var k in state.stuffs) {
		let stuff = state.stuffs[k];
		let pendingStuff = state.stuffsPendingUpdate[k];
		cards.push((
			<StuffCard key={ stuff.id } stuff={ stuff } pendingStuff = { pendingStuff }
				onChange = { event => store.dispatch(A.changeStuff(stuff.id, event.target.value)) }
				onRollback = { event => store.dispatch(A.rollbackStuff(stuff.id)) }
				onCommit = { event => store.dispatch(A.updateStuff(stuff.id)) }
				onTrash = { event => store.dispatch(A.destroyStuff(stuff.id)) }
				/>
		));
	}
	
	return (
		<div className="container">
			{ cards }
			<NewStuffCard onClick = { () => store.dispatch(A.createStuff()) } />
		</div>
	);
}