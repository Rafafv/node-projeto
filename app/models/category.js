const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    descricao: String, 
    produto :{
        type:mongoose.Schema.Types.ObjectId, ref:'Produto'
    }   
});

module.exports = mongoose.model('Categoria', categoriaSchema);