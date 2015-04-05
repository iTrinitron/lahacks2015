/*
 * models/Photo.js
 * 
 * @author Michael Chin
 * 
 */
var mongoose = require('mongoose');

//Photo Schema
var PhotoSchema = new mongoose.Schema({
  lat: Number,
  long: Number,
  creator_id: Number,
  receiver_id: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('photo', PhotoSchema);

