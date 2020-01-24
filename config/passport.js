var passport = require('passport');
var User = require('../models/userSchema');
var LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser( function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    User.findOne({'email':email}, function(err, user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, {mesage: 'E-mail is already in use'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPasssword(password);
        newUser.save(function(err, result){
            if(err){
                return done(err);
            }
            console.log(result); 
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    User.findOne({'email':email}, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {mesage: 'Authentication failed'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {mesage: 'Authentication failed'}); 
        }
        return done(null, user);
    });
}));