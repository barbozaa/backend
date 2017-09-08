var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  morgan      = require('morgan'), // get our mongoose model
  config = require('./config'),
  jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens;


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

var routes = require('./api/routes/listRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res, next) {
 // res.status(404).send({url: req.originalUrl + ' not found'})

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);