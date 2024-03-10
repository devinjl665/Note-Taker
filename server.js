const express = require('express');
const apiRoute = require('./routes/apiRoute.js');
const htmlRoute = require('./routes/htmlRoute.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.use('/api', apiRoute);
app.use('/', htmlRoute);

// Start the server
app.listen(PORT, () => 
  console.log(`App is listening at http://localhost:${PORT}`)
);
