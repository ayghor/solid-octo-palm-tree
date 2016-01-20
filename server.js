var express = require('express');
var app = express();
var port = process.env.PORT
port = port ? port : 3000;

var api = require('./api');
var concat = require('concat-stream');

app.use('/api', function(req, res, next){
  req.pipe(concat(function(data){
    req.body = data.toString();
    next();
  }));
});

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));
app.use('/api', api);
app.use('/', express.static(__dirname + '/static'));

app.get('/', (req, res) => res.sendFile('/static/index.html'));

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
