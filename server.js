// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

app.get("/api/timestamp/:input" , (req, res) => {
    let date;
    date = new Date(req.params.input)
    if (!isNaN(req.params.input)) {
      date = new Date(parseInt(req.params.input))
    }
    
    if (date == "Invalid Date") {
      return res.send({error:"Invalid Date"})
    }
    
    res.send({
        unix:  date.valueOf(),
        utc: date.toGMTString()
    })
})

app.get("/api/timestamp/" , (req, res) => {
    let date = new Date(Date.now())
    res.send({
        unix:  date.valueOf(),
        utc: date.toGMTString()
    })
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

