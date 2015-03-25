/*
	Express.js REST parameters example
	Shows how to take values in a RESTful way
	in Express.js 4.0
	
	This does no checking on the data sent, it just takes
	the values in and adds them to arrays.
	
	created 10 Feb 2015
	by Tom Igoe
*/

var express = require('express');	// include express.js
var app = express();						// a local instance of it

var bodyParser = require('body-parser');
// create application/json parser 
var jsonParser = bodyParser.json();
// urlencoding parser
var urlParser = bodyParser.urlencoded();

// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'));

var state = 0;							// an array for name values from the client	
var color = null;								// an array of age values from the client
	
// this runs after the server successfully starts:
function serverStart() {
  var port = server.address().port;
  console.log('Server listening on port '+ port);
}


function colorChecker(c) {
	var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(c);
	return isOk;
}

// this is the handler for the root of the site:
app.get('/', function (request, response) {
	response.sendFile('index.html');
});

app.get('/lamp', function (request, response) {
	response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({'state': state,
		'color': color}));
});

app.post('/lamp', jsonParser, function (request, response){
	console.log(request.body);
	var state_ = request.body.state;
    var color_ = request.body.color;
    response.setHeader('Content-Type', 'application/json');
    if(state_ ===1 && color_ === ""){
		response.end(JSON.stringify({'status': 'Failed - Please include color',
			'state': state_,
			'color': color_}));
    } else if(state_ ===0 && color_ !== "") {
		response.end(JSON.stringify({'status': 'Failed - No color with state off',
			'state': state_,
			'color': color_}));
    } else if(state_ === 1 && !colorChecker(color_)) {
		response.end(JSON.stringify({'status': 'Failed - Invalid color',
			'state': state_,
			'color': color_}));
    } else {
		response.end(JSON.stringify({'status': 'Success',
			'state': state_,
			'color': color_}));
		state = state_;
		if(color_ === ""){
			color = null;
		} else {
			color = color_;
		}
	}
    console.log(state, color);
});

app.post('/form', urlParser, function (request, response){
	console.log(request.body);
	var state_ = parseInt(request.body.state);
    var color_ = request.body.color;
    response.setHeader('Content-Type', 'application/json');
    if(state_ === 1 && color_ === ""){
		response.end(JSON.stringify({'status': 'Failed - Please include color',
			'state': state_,
			'color': color_}));
    } else if(state_ ===0 && color_ !== "") {
		response.end(JSON.stringify({'status': 'Failed - No color with state off',
			'state': state_,
			'color': color_}));
    } else if(state_ === 1 && !colorChecker(color_)) {
		response.end(JSON.stringify({'status': 'Failed - Invalid color',
			'state': state_,
			'color': color_}));
    } else {
		response.end(JSON.stringify({'status': 'Success',
			'state': state_,
			'color': color_}));
		state = state_;
		if(color_ === ""){
			color = null;
		} else {
			color = color_;
		}
	}
    console.log(state, color);
});




// start the server:
var server = app.listen(8080, serverStart);

