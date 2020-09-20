
const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    nome: String,
    preco: Number,
    descricao: String,
    category: [{ type: Schema.Types.ObjectId, ref: 'Action' }]
});

const categoriaSchema = new Schema({
    descricao: String
});


module.exports = mongoose.model('Produto', produtoSchema), mongoose.model('Category', categoriaSchema);