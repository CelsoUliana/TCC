/*eslint-env node*/

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
const cfenv = require('cfenv')

// env express
const app = require('../config/express-env')

// routes
const api = require('./routes/api-route')
const front = require('./routes/home-route')

// start api routes
app.use('/api/v1', api)

// start frontend
front.init(app)
app.use('/', front.router)

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv()

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url)
})
