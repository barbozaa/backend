'use strict';
module.exports = function(app) {
  var controllerUsers = require('../controllers/controllerUsers');
  var controllerClients = require('../controllers/controllerClients');
  var authController = require('../controllers/authController');

  // controllers Users
  app.route('/users')
    .get(controllerUsers.list_all_users);

  app.route('/newUser')
  	.post(controllerUsers.create_a_user);

  app.route('/user/:userId')
    .get(controllerUsers.read_a_user);

  app.route('/updateUser/:userId')
  	.put(controllerUsers.update_a_user);
  
  app.route('/deleteUser/:userId')
  	.delete(controllerUsers.delete_a_user);

  // controllers Clients
  app.route('/clients')
    .get(controllerClients.list_all_clients);

  app.route('/newClient')
  	.post(controllerClients.create_a_client);

  app.route('/client/:clientId')
    .get(controllerClients.read_a_client);

  app.route('/updateClient/:clientId')
  	.put(controllerClients.update_a_client);
  
  app.route('/deleteClient/:clientId')
  	.delete(controllerClients.delete_a_client);


  // those routes are for authenticate users only
  app.route('/user/authenticate')
  	.post(authController.authenticateUsers);

  app.route('/client/authenticate')
  	.post(authController.authenticateClients);

  app.route('/logout')
  	.get(authController.logout);

};