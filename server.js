var app = new (require('express'))()
var port = 3000

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/sauce/ui/index.html');
});

app.get('/bundle.js', function (req, res) {
	res.sendFile(__dirname + '/build/ui/bundle.js');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
