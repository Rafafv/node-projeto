const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const customerSchema = new Schema({
    name: {type: String,
           require: true},
    email: {type: String,
           require: true},
    password:  {type: String,
            require: true},
});

//registro
customerSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8, null));
}

//login
customerSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports =  DB_PRINCIPAL.model('Customer', customerSchema);