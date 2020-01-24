'use strict';   

var userAssembler = require('../assemblers/userAssembler.js');
var User = require('../models/userSchema.js');


exports.findAllUsers = function(req, res) {
    User.find({}, function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(userAssembler.modelsToDtos(user));
        }
    });
};



exports.deleteUser = function(req, res) {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(  
            res.status(200).json({
                message: 'User deleted'
            })
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.LogOut = function(req, res){
    req.logout();
    res.redirect('/');
};

exports.GetReg = function(req, res) {
    var messages = req.flash('error'); 
    res.render('registration', {csrfToken: req.csrfToken(), messages: messages});
};

exports.GetLog = function(req, res) {
    var messages = req.flash('error'); 
    res.render('login', {csrfToken: req.csrfToken(), messages: messages});
};

exports.isLoggedIn = function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    res.json({message: 'Not logged in'});
};
