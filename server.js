// Pull in required dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require("cors");

// Configure express
var app = express();
var PORT = process.env.PORT || 3000;

// Expose access CSS files
app.use(express.static(path.join(__dirname, "app")));

// Add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());


// Add routes
require("./app/routing/apiRouting")(app);
require("./app/routing/htmlRoutes")(app);

// Start listening on PORT
app.listen(PORT, function() {
  console.log('Dog Friend Finder app is listening on PORT: ' + PORT);
});