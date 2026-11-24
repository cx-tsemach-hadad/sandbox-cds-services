const express = require('express');
const bodyParser = require('body-parser');
const cdsServices = require('./discovery/cds-services');
const defaultCors = require('./middleware/default-cors');
const errorHandler = require('./middleware/error-handler');

const app = express();

// This is necessary middleware to parse JSON into the incoming request body for POST requests
app.use(bodyParser.json());

// CDS Services must implement CORS to be called from a web browser
app.use(defaultCors);

app.set('json spaces', '  ');

app.use('/cds-services', cdsServices);

// Simple landing page that greets a visitor by name
app.get('/welcome', (request, response) => {
  const name = request.query.name || 'guest';
  response.send(`<h1>Welcome ${name}</h1>`);
});

app.use((request, response, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle specified errors or return a 500 for internal errors
app.use(errorHandler);

module.exports = app;
