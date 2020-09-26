const Produto = require('../app/models/product');

//POST
exports.post = async(data) =>{
    const produto = new Produto(data);
    await produto.save();
};

//GET
exports.getAll = async () =>{
    const res = await Produto.find();
    return res;
};

//GETBYID
exports.getById = async(id) =>{
    const res = await Produto.findById(id);
    return res;
};

//PUT
exports.put = async(id,data) =>{
    await Produto.findByIdAndUpdate(id,{
        $set:{
            nome:data.nome,
            preco:data.preco,
            descricao:data.descricao
        }
    });
};

//DELETE
exports.delete = async(id)=>{
    await Produto.findByIdAndDelete(id);
}