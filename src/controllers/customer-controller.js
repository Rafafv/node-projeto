const customer = require('../app/models/customer');
const repository= require('../repositories/customer-repository');
const log= require('../repositories/logs-repository');
exports.post = async (req, res)=>{
   
    try{
        await repository.post({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password
        });
        await log.logs({
            method:'POST',
            name: req.body.name,
            email: req.body.email,
        });
        res.status(201).send({
            message: 'Customer cadastrado com sucesso!'
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
 
};

exports.getAll = async (req, res) =>{
   try {
        const data = await repository.getAll();
        res.status(200).send(data);
   } catch (error) {
       res.status(500).send({
           message: "Falha ao processar requisição", erro:error
       });
   }
};

exports.getById = async (req, res)=>{
try {
    const id = req.params.customerId;
    const data = await repository.getById(id);
    
    if(data == null){
        res.status(400).json({message:"Customer não encontrado"});
    }
    else{
        res.status(200).send(data);
    }
   
} catch (error) {
    res.status(500).send({
        message: "Falha ao processar requisição", erro:error
    });
}
};


exports.put = async (req, res)=>{
   
    try {
        const id = req.params.productId;
        const data = await repository.put(id);
        res.status(200).send({
            message: "Customer atualizado com sucesso!", dados:data
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição", erro:error
        });
    }
};


exports.delete = async (req, res)=>{
 try {
    const id = req.params.customerId;
    await repository.delete(id);
     res.status(200).send({
        message: "Produto atualizado com sucesso!", dados:data
    });
 } catch (error) {
    res.status(500).send({
        message: "Falha ao processar requisição", erro:error
    });
 }
};

exports.customerRegister = async(req,res) =>{
    try {
        await repository.register(req.body.name,req.body.email,req.body.password);
        res.status(201).send({message: "Usuário registrado com sucesso!"})
    } catch (error) {
        
        res.status(500).send({message: "Erro ao registrar usuário"});
    }
}
