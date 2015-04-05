/*
 * 
 * routes/photos.js
 * 
 * @author Michael Chin
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Photo = require('../models/Photo.js');

//Get all photos by the creator_id specified
router.get('/:id/myPhotos', function(req, res, next) {
  Photo.find({creator_id: req.params.id}, function (err, photos) {
    if (err) return next(err);
    res.json(photos);
  });
});

//Get all photos meant to viewed by the ID specified
router.get('/:id/friendsPhotos', function(req, res, next) {
  Photo.find({receiver_id: req.params.id}, function (err, photos) {
    if (err) return next(err);
    res.json(photos);
  });
});

//Create a Photo
router.post('/', function(req, res, next) {
  req.body.file = req.files.file.name; //Get the uploaded file name and attach it to the object
  Photo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json({success: true});
  });
});

//req.body, 

//Delete a Photo
router.delete('/:photo_id', function(req, res, next) {
  Photo.findByIdAndRemove(req.params.photo_id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({success: true});
  });
});

/*
 * DEBUG
 */

//Delete all photos
router.get('/deleteAll', function(req, res, next) {
  Photo.remove(function (err, post) {
    if (err) return next(err);
    res.json({success: true});
  });
});

//Retrieve all photos
router.get('/getAll', function(req, res, next) {
  Photo.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;