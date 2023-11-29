const express = require('express');
// Path is node js module
const path = require('path');
const logger = require('./middleware/logger');
// For importing
const app = express();

// Init Middleware
// app.use(logger);

// Init body parser
// It will send the data as it is in response of making a new member.
app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// Setting static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/students', require('./routes/api/students'))

app.listen(5000);

// http://localhost:5000/api/students write this in thunder-client for getting all students.