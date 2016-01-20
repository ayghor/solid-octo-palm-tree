var pgp = require("pg-promise")();

var url = process.env.DATABASE_URL;
url = url ? url : '/tmp';

var db = pgp(url);

function createStuff(text) {
	return db.one('insert into stuff (text) values (${text}) returning *;', {text: text});
}

function readStuff(id) {
	return db.oneOrNone('select * from stuff where id = ${id};', {id: id});
}

function readAllStuff() {
	return db.query('select * from stuff;');
}

function updateStuff(id, text) {
	return db.one('update stuff set text = ${text} where id = ${id} returning *;', {id: id, text: text});
}

function destroyStuff(id) {
	return db.one('delete from stuff where id = ${id} returning *;', {id: id});
}

module.exports = {createStuff, readStuff, readAllStuff, updateStuff, destroyStuff};