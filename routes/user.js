const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
var csrf = require('csurf');
var csrfProtection = csrf();
var passport =require('passport');
router.use(csrfProtection);



router.post('/signup',passport.authenticate('local.signup',{
    successRedirect: '/user/login',
    failureRedirect: '/user/signup',
    failureFlash: true
}  
));

router.post('/login', passport.authenticate('local.signin',{
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

router.delete('/deleteUser',userController.isLoggedIn,userController.deleteUser);

router.get('/signup',userController.GetReg);

router.get('/login', userController.GetLog);

router.get('/users',userController.isLoggedIn, userController.findAllUsers);

router.get('/logout',userController.LogOut);

module.exports = router;



