// server.js
// where you
const dotenv = require("dotenv");
dotenv.config();

// init project
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Initiate body parser
app.use(bodyParser.urlencoded({ extended: false }));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let date = new Date;
  res.json({
    unix: Math.floor(date.getTime()),
    utc: date.toUTCString()
  });
});

app.get("/api/:date", function (req, res) {
  let dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  let unixRegex = /^\d{13}$/;
  let epochRegex = /^\d{12}$/;
  let dateStr = req.params.date;
  let parsedDate = (dateStr.match(unixRegex) != null || dateStr.match(epochRegex)) ? new Date(parseInt(dateStr)) : new Date(dateStr);

  if (dateStr.match(unixRegex) != null) {
    res.json({
      unix: parseInt(dateStr),
      utc: parsedDate.toUTCString()
    });
  } else if (parsedDate != "Invalid Date") {
    res.json({
      unix: Math.floor(parsedDate.getTime()),
      utc: parsedDate.toUTCString()
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
