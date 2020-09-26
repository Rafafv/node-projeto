const Produto = require('../app/models/product');
const repository = require('../repositories/product-repository');

// await para tentar , async funcao assincrona
exports.post = async (req, res)=>{
   
    try{
        await repository.post({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao:req.body.descricao
        });
        res.status(200).send({
            message: 'Produto cadastrado com sucesso!'
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
    const id = req.params.productId;
    const data = await repository.getById(id);
    res.status(200).send(data);
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
            message: "Produto atualizado com sucesso!", dados:data
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição", erro:error
        });
    }
};


exports.delete = async (req, res)=>{
 try {
    const id = req.params.productId;
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
