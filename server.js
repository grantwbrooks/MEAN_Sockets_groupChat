// Import express and path modules.
var express = require( "express");
var path = require( "path");
var session = require('express-session');
// var notifier = require('node-notifier');



// Create the express app.
var app = express();
app.use(session({secret: 'secretchatappcode'}));  // string for encryption


// variables to hold Users and conversations
var connectedUsers = {};
var conversations = [];

// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
//Question for Brandon--- is this ok to do????
app.use(express.static(path.join(__dirname, "./node_modules")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Start Node server listening on port 8000, create server var and put it in listen method
var server = app.listen(8000, function() {
 console.log("listening on port 8000 for groupChat");
});

//get all the routes
var routes = require('./routes/index.js')(app,server,connectedUsers,conversations);