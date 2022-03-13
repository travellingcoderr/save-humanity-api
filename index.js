var express = require('express');
var app = express();
const path = require('path');
const PORT = process.env.PORT || 5050;

const { locations } = require('./util/handlers/locations')
const { addlocation } = require('./util/handlers/addlocation')
const { getaddress } = require('./util/handlers/getaddress')
const { saveprofile } = require('./util/handlers/saveprofile')

app.get('/locations', locations)
app.get('/addlocation', addlocation);
app.get('/getaddress', getaddress);
app.get('/saveprofile', saveprofile);

app.get('/foo', function(req,res) {
    res.send('index.html');
});

app.get('/save-humanity', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(PORT, function() {
    console.log('Save Humanity Running at: ${PORT}');
});

