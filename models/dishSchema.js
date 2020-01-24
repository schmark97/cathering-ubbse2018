'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name: {type: String, required: true},
    ingredients: {type: String, required: true},
    price:{type: Number, required: true}
}, {collection: 'dish'});


module.exports = mongoose.model('Dish', dishSchema);