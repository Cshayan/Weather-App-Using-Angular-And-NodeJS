/*
 *  Entry point to back-end (index.js
 */

// Bring the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

// Import routes
const getWeatherRoutes = require('./routes/get_weather');

// Init express
const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());

// Routes Settings
app.use('/get-weather', getWeatherRoutes);

// Listen to server
app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});