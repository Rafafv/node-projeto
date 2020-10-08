const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
     method:String,
     name:String,
     email:String
});

module.exports = DB_LOGS.model('Logs', logSchema);