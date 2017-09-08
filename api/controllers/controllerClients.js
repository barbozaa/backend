'use strict';


var mongoose = require('mongoose'),
  Client = require('../models/clientsModels'),
  jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
  config = require('../../config'); // get our config file;

//GET ALL
exports.list_all_clients = function(req, res) {
  Client.find({}, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};

//POST
exports.create_a_client = function(req, res) {
  var new_client = new Client(req.body);
  new_client.save(function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};

//GET SINGLE
exports.read_a_client = function(req, res) {
  Client.findById(req.params.clientId, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};

//PUT
exports.update_a_client = function(req, res) {
  Client.findOneAndUpdate({_id: req.params.clientId}, req.body, {new: true}, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};

//DELETE
exports.delete_a_client = function(req, res) {
  Client.remove({
    _id: req.params.clientId
  }, function(err, client) {
    if (err)
      res.send(err);
    res.json({ message: 'Client successfully deleted' });
  });
};
