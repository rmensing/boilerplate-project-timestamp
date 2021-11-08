// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/:input?', (req, res, next) => {
  var input = req.params.input;
  console.log("First input: " + input);
  var date = new Date(input);
  console.log("First date: " + date);
  if (isNumeric(input) && input.length == 10){
    date = new Date(parseInt(input)*1000);
    console.log("isNumeric: " + date);
  } else if (isNumeric(input) && input.length == 13){
    date = new Date(parseInt(input));
    console.log("isNumeric: " + date);    
  }
  if (input ==null){
    date = new Date();
    console.log("test null: " + date);
  }
  console.log(date);
  req.dStr = date.toGMTString();
  req.uts = Date.parse(date);
  console.log(date.toGMTString());
  console.log(Date.parse(date));
  next();
},
(req, res) => {
  if (req.dStr === "Invalid Date") {
    res.json({error: req.dStr});
  } else {
  res.json({unix: req.uts, utc: req.dStr});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
