
exports.modelToDto = function(dish) {
    return {
        id: dish._id,
        name: dish.name,
        ingredients: dish.ingredients,
        price: dish.price
    };
};


exports.modelsToDtos = function(dish){
    var result = [];
    for (var i = 0; i < dish.length; i++) {
        result.push({
            id: dish[i]._id,
            name: dish[i].name,
            ingredients: dish[i].ingredients,
            price: dish[i].price
        });
    }
    return result;
};

exports.dtoToModel = function(dishDto) {
    return {
        _id: dishDto.id,
        name: dishDto.name,
        ingredients: dishDto.ingredients,
        price: dishDto.price
    };
};