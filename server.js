var http = require('http'),
	bodyParser = require('body-parser'), //need this to parse body request
	express = require('express'),
	app = express(),
    faye = require('faye'),
    Mockaroo = require('mockaroo');

var client = new Mockaroo.Client({
    apiKey: '54f347b0'
})

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.post('/message', function(req, res) {

  client.generate({
	    count: 20,
	    schema: 'Emerson Sensi Feed Data'
	}).then(function(records) {
	    //console.log(records);
	    for (var i=0; i<records.length; i++) {
	        var record = records[i];
	        bayeux.getClient().publish('/channel', {text: record.icd_id});
	    }
  	});

  res.send(200);
});

var server = http.createServer(app),
    bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

bayeux.attach(server);
server.listen(process.env.PORT || 8000)
console.log('server listening to 8000')





