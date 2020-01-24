const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});
userSchema.methods.encryptPasssword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);