'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Client = require('../models/clientsModels'),
  jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
  config = require('../../config'); // get our config file;

exports.authenticateUsers = function(req, res){
  console.log(req.body.username);
  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          id: user._id
        });
      }   

    }
  });
};

exports.authenticateClients = function(req, res){
  // find the client
  Client.findOne({
    username: req.body.username
  }, function(err, client) {

    if (err) throw err;

    if (!client) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (client) {

      // check if password matches
      if (client.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if client is found and password is right
        // create a token
        var token = jwt.sign({ id: client._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          id: user._id
        });
      }   

    }
  });
};

exports.logout = function(req, res){
  res.status(200).send({ 
    success: true,
    message: "Token has been deleted", 
    token: null });
};