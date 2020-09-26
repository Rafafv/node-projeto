const Customer = require('../app/models/customer');

exports.post = function (req, res){
    const customer = new Customer();
    customer.name = req.body.name;
    customer.email = req.body.email;
    customer.password = req.body.password;
   
    customer.save(function(error){
        if(error)
          res.send(`Erro ao excluir, ${error}`)

        res.status(201).json({message: "Inserido com sucesso"});
    })
};


exports.getAll = function(req, res){
    Customer.find(function(error, cust){
        if(error){
            res.status(500).json({message:"Erro ao tentar encontrar"});
        }
        else{
            res.status(200).json({message:"Retorno de todos customers", customer: cust}); 
        }
         
    });
};


exports.getById = function(req, res){
    const id = req.params.customerId;
    Customer.findById(id,function(error, cust){
        if(error){
            res.status(500).json({message:"Erro ao tentar encontrar"});
        }
        else if(cust == null){
            res.status(400).json({message:"Customer não encontrado"});
        }
        else{
            res.status(200).json({message:"Retorno de todos os customers",  customer: cust}); 
        }
         
    });
};