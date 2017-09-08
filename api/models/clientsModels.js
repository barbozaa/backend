'use strict';
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Client = new Schema({
	name: String,
	status: {
		type:[{
			type: String,
			enum: ['single', 'married']
		}],
		required: 'Kindly enter the status of the client'
	},
	sex: {
	    type: [{
	      type: String,
	      enum: ['male', 'female']
	    }],
	    required: 'Kindly enter the sex of the client'
	  },
	age: Number,
	profession: String
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Clients', Client);