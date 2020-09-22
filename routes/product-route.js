const express = require('express');
const router  = express.Router();
const Produto = require('../app/models/product');
const Categoria = require('../app/models/category');

//const mongoose = require('mongoose');

// rotas para Produto
//post localhost:3000/api/produtos
router.post('/', function (req,res){
    const produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;
    produto.categoria = req.body.categoria;

    produto.save(function(error){
        if(error)
          res.send("erro ao tentar salvar", error)

        res.status(201).json({message: "Produto inserido com sucesso"});
    })
});

//get localhost:3000/api/produtos
router.get('/', function (req,res){
       produtos =  Produto.find().populate('categoria');
       res.status(200).json(produtos); 
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
});

module.exports = router;