var http = require('http'),
	bodyParser = require('body-parser'), //need this to parse body request
	express = require('express'),
	app = express(),
    faye = require('faye');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.post('/message', function(req, res) {
  bayeux.getClient().publish('/channel', {text: req.body.message});
  res.send(200);
});

var server = http.createServer(app),
    bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

bayeux.attach(server);
server.listen(8000);
console.log('server listening to 8000')