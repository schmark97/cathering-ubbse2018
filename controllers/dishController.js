'use strict';   
var dishAssembler = require('../assemblers/dishAssembler.js');
var Dish = require('../models/dishSchema.js');



exports.findAllDishes = function(req, res) {
    Dish.find({}, function(err, dish) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('menu',{items:dishAssembler.modelsToDtos(dish)});
        }
    });
};

exports.createDish = function(req, res) {
    var dish = new Dish(dishAssembler.dtoToModel(req.body));
    dish.validate(function(err) {
        if (err) {
            res.status(400).send({message: err.message});
        } else {
            dish.save(function(err, dish) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(dishAssembler.modelToDto(dish));
                }
            });
        }
    });
}; 


exports.findDishById = function(req, res) {
    Dish.findById(req.body, function(err, dish) {
        if (err) {
            res.status(500).send(err);
        } else if (dish === null) {
            res.sendStatus(404);
        } else {
            res.render('menu',{items:dishAssembler.modelToDto(dish)});
        }
    });
};


exports.deleteDish = function(req, res) {
    Dish.findById(req.body.id, function(err, dish){
        if (err) {
            res.status(500).send(err);
        }else if (dish === null) {
            res.sendStatus(404);
        }else{
            dish.remove(function(err){
                if(err){
                    res.sendStatus(404);
                }else{
                    res.json({message: 'Menu item succesfully deleted'});
                }
            }
            );
        }
        
    });
};

exports.updateDish = function(req, res) {
    Dish.findById(req.body.id, function(err, dish){
        if (err) {
            res.status(500).send(err);
        }else if (dish === null) {
            res.sendStatus(404);
        }else{
            dish.name = req.body.name;
            dish.ingredients = req.body.ingredients;
            dish.price = req.body.price;
            dish.validate(function(err) {
                if (err) {
                    res.status(400).send({message: err.message});
                } else {
                    dish.save(function(err, dish) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(dishAssembler.modelToDto(dish));
                        }
                    });
                }
            });
        }       
    });
};

exports.RendAddMenuItem = function(req, res) {
    res.render('add_menuitem');
};

exports.RendDeleteMenuItem = function(req, res) {
    res.render('delete_menuitem');
};

exports.RendUpdateMenuItem = function(req, res) {
    res.render('update_menuitem');
};