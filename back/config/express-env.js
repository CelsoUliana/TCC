//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// path
const path = require('path')

// create a new express server
const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


// ejs view
app.set('view engine', 'ejs')

module.exports = app