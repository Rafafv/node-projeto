const Customer = require('../app/models/customer');

//POST
exports.post = async(data) =>{
    const customer = new Customer(data);
    await customer.save();
};

//GET
exports.getAll = async () =>{
    const res = await Customer.find();
    return res;
};

//GETBYID
exports.getById = async(id) =>{
    const res = await Customer.findById(id);
    return res;
};

//PUT
exports.put = async(id,data) =>{
    await Customer.findByIdAndUpdate(id,{
        $set:{
            nome:data.name,
            preco:data.email,
            descricao:data.password
        }
    });
};

//DELETE
exports.delete = async(id)=>{
    await Customer.findByIdAndDelete(id);
}