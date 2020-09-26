const Produto = require('../app/models/product');

exports.post = function (req, res){
    const produto = new Produto();
  //  const categoria = new Categoria();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;
   // categoria.categoria = req.body.categoria.id;

    produto.save(function(error){
        if(error)
          res.send(`Erro ao excluir produto error, ${error}`)

        res.status(201).json({message: "Produto inserido com sucesso"});
    })
};

exports.getAll = function(req, res){
    Produto.find(function(error, produto){
        if(error){
            res.status(500).json({message:"Erro ao tentar encontrar produto"});
        }
        else{
            res.status(200).json({message:"Retorno de todos os produtos", produto: produto}); 
        }
         
    });
};

exports.getById = async function(req, res){
    const id = req.params.productId;
    Produto.findById(id,function(error, produto){
        if(error){
            res.status(500).json({message:"Erro ao tentar encontrar produto"});
        }
        else if(produto == null){
            res.status(400).json({message:"Produto não encontrado para o Id: ", id});
        }
        else{
            res.status(200).json({message:"Retorno de todos os produtos", produto: produto}); 
        }
         
    });
};


exports.put = async function (req, res){
    const id = req.params.productId;
    console.log(id);
    Produto.findById(id, function(error, produto){
        if(error){
            res.status(500).json({message:"Erro ao tentar encontrar produto"});
        }
        else if(produto == null){
            res.status(400).json({message:"Produto não encontrado para o Id: ", id});
        }
        else{
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;
            produto.save(function(error){
                if(error)
                   res.send(`Erro ao excluir produto error, ${error}`);

                res.status(200).json({message:"Produto atualizado com sucesso"}); 
            })
           
        }
    });
};


exports.delete = async function (req, res){
    Produto.findByIdAndRemove(req.params.productId,(error,produto)=>{
        if(error)
           res.status(500).send(`Erro ao excluir produto error, ${error}`);

        const response ={
            message: "Produto excluído com sucesso!",
            id: produto.id
        };
        return res.status(200).send(response);
    });
};



/**
 * exports.post = function (req, res){
    const {nome,preco,descricao} = req.body;
    id = req.body.categoria;
    const produto = Produto.create({nome,preco,descricao, categoria: id});

   produto.save(function(error){
        if(error)
          res.send("erro ao tentar salvar", error)

        res.status(201).json({message: "Produto inserido com sucesso"});
    })

};

exports.getAll = async function(req, res){
    const produto = Produto.find().populate('categoria');
    return res.send({produto});
};

exports.getById = async function(req, res){
    const produto = await Produto.findById(req.params.productId).populate('categoria');
    return res.send({produto});
};

exports.put = async function (req, res){
    const produtoId = req.params.productId;
    const categoriaId  = req.body.categoria;
     // console.log(produtoId);
    Produto.findById(produtoId, function(error, produto){
        if(error){
            res.status(500).json({message:"Erro ao tentar encontrar produto"});
        }
        else if(produto == null){
            res.status(400).json({message:"Produto não encontrado para o Id: ", produtoId});
        }
        else{
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;
            produto.categoria = categoriaId;
            produto.save(function(error){
                if(error)
                   res.send("Erro ao tentar atualizar produto", error);

                res.status(200).json({message:"Produto atualizado com sucesso"}); 
            })
           
        }
    });
};

exports.delete = async function (req, res){
    const produto = await Produto.findByIdAndRemove(req.params.productId);
    return res.send("Produto excluído com sucesso!");
};


 */
