const Produto = require('../app/models/product');
const Categoria = require('../app/models/category');


exports.post = function await (req, res){
    const {nome,preco,descricao} = req.body;
    id = req.body.categoria;
    const produto = await Produto.create({nome,preco,descricao, categoria: id});

    await produto.save(function(error){
        if(error)
          res.send("erro ao tentar salvar", error)

        res.status(201).json({message: "Produto inserido com sucesso"});
    })

};

exports.getAll = function async (req, res){
    const produto = await Produto.find().populate('categoria');
    return res.send({produto});
};

exports.getById = function  async (req, res){
    const produto = await Produto.findById(req.params.productId).populate('categoria');
    return res.send({produto});
};

exports.put = function  async (req, res){
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

exports.delete = function  async (req, res){
    const produto = await Produto.findByIdAndRemove(req.params.productId);
    return res.send("Produto excluído com sucesso!");
};



/*

Funcoes antes do categoria

router.post('/', function (req,res){
    const produto = new Produto();
    const categoria = new Categoria();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;
    categoria.categoria = req.body.categoria.id;

    produto.save(function(error){
        if(error)
          res.send("erro ao tentar salvar", error)

        res.status(201).json({message: "Produto inserido com sucesso"});
    })
});

//get localhost:3000/api/produtos
router.get('/', function (req,res){
    Produto.find().populate('categoria'),(err, prod) => {
        if (err) handleError(res, err.message, 'Failed ')
        res.status(200).json(prod)   
        console.log(req.params)
  
    }
});


//getbyId localhost:3000/api/produtos/Id
router.get('/:productId', function (req,res){
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
});

//putbyId localhost:3000/api/produtos/Id
router.put('/:productId',function(req,res){
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
                   res.send("Erro ao tentar atualizar produto", error);

                res.status(200).json({message:"Produto atualizado com sucesso"}); 
            })
           
        }
    });
});

//deletebyId localhost:3000/api/produtos/Id
router.delete('/:productId', function (req, res){
    Produto.findByIdAndRemove(req.params.productId,(error,produto)=>{
        if(error)
           res.status(500).send("Erro ao excluir produto", error);

        const response ={
            message: "Produto excluído com sucesso!",
            id: produto.id
        };
        return res.status(200).send(response);
    });
});*/