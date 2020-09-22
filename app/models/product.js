const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    nome: String,
    preco: Number,
    descricao: String,
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }
});


//const prod = mongoose.model('Produto', produtoSchema);
//const cat = mongoose.model('Categoria', categoriaSchema);

module.exports =  mongoose.model('Produto', produtoSchema);