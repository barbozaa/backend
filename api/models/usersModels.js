'use strict';
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	username: String,
	password: String,
	tuser: {
	    type: [{
	      type: String,
	      enum: ['admin', 'normal']
	    }],
	    default: ['normal']
	  },
	imagePath: String
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Users', User);