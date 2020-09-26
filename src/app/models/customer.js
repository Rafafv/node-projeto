const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {type: String,
           require: true},
    email: {type: String,
           require: true},
    password:  {type: String,
            require: true},
});

module.exports =  mongoose.model('Customer', customerSchema);