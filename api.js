var express = require('express');
var db = require('./database');

var api = express.Router();

/*
  * this whole file is so ugly I'm so proud
  *
  */

function asd(p, res) {
	p.then((s) => (s ? res : res.status(404)).send(s)).catch(() => res.status(503).send(null));
}

api.post('/stuffs', (req, res) => asd(db.createStuff(req.body), res));
api.get('/stuffs', (req, res) => asd(db.readAllStuff(), res));
api.get('/stuffs/:id', (req, res) => asd(db.readStuff(req.params.id), res));
api.patch('/stuffs/:id', (req, res) => asd(db.updateStuff(req.params.id, req.body), res));
api.delete('/stuffs/:id', (req, res) => asd(db.destroyStuff(req.params.id), res));

module.exports = api;