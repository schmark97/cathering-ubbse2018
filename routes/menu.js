var express = require('express');
var router = express.Router();
var dishController = require('../controllers/dishController');
const userController = require('../controllers/userController');


router.get('/',dishController.findAllDishes);

router.get('/addMenuItem',userController.isLoggedIn,dishController.RendAddMenuItem);

router.post('/addMenuItem',userController.isLoggedIn,dishController.createDish);

router.get('/deleteMenuItem',userController.isLoggedIn,dishController.RendDeleteMenuItem);

router.post('/deleteMenuItem',userController.isLoggedIn, dishController.deleteDish);

router.get('/updateMenuItem',userController.isLoggedIn, dishController.updateDish);

router.post('/UpdateMenuItem',userController.isLoggedIn, dishController.updateDish);
module.exports = router;