//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
const express = require('express');

// path
const path = require('path')

// create a new express server
const app = express();

// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, '../', 'public')))

// set folder of project views
app.set('views', path.join(__dirname, '../', 'src/views'))

// ejs view
app.set('view engine', 'ejs')

module.exports = app