const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// If Connection to database is successful.
mongoose.connection.on('connected', function() {
    console.log('Connection to database was successful: '+ config.database);
});

// If Connection to database was unsuccessful
mongoose.connection.on('error', function(error) {
    console.log('Connection to database was unsuccessful: '+ error);
});

const app = express();

// User route
const users = require('./routes/users');

// Port number
const port = 8080;

// CORS middleware
app.use(cors());

// Folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// Middleware for users
app.use('/users', users);

// Index route
app.get('/', function(request, response) {
    response.send('This is the home page');
});

app.listen(port, function() {
    console.log('Server started on port '+ port);
});
