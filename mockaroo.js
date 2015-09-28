var Mockaroo = require('mockaroo'); // npm install mockaroo
var sleep = require('sleep');

var client = new Mockaroo.Client({
    apiKey: '54f347b0'
})

client.generate({
    count: 2,
    schema: 'Emerson Sensi Feed Data'
}).then(function(records) {
    //process the records
    for (var i=0; i<records.length; i++) {
        var record = records[i];
        console.log(record.icd_id);
        //console.log('record ' + i, 'id:' + record.id + ', transactionType:' + record.transactionType);
    }
});