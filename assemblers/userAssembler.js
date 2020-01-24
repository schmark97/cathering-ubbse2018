
exports.modelToDto = function(user) {
    return {
        id: user._id,
        email: user.email,
    };
};


exports.modelsToDtos = function(user){
    var result = [];
    for (var i = 0; i < user.length; i++) {
        result.push({
            id: user[i]._id,
            email: user[i].email,
        });
    }
    return result;
};

exports.dtoToModel = function(userDto) {
    return {
        _id: userDto.id,
        email: userDto.email,
        password: userDto.password,
    };
};