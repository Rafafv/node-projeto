const express = require('express');
const router  = express.Router();
const Categoria = require('../app/models/category');

// rotas para Categoria
//post localhost:3000/api/categorias
router.post('/', function (req,res){
    const categoria = new Categoria();
    categoria.descricao = req.body.descricao;

    categoria.save(function(error){
        if(error)
          res.send("erro ao tentar salvar", error)

        res.status(201).json({message: "Categoria inserida com sucesso"});
    })
});

//get localhost:3000/api/categorias
router.get('/', function (req,res){
    Categoria.find(function(error, cat){
        if(error)
           res.send(error);

        res.status(200).json({
            message:"Retorno de todas as categorias", allCategory: cat
        });   
    });
});

//getbyId localhost:3000/api/categorias/Id
router.get('/:categoryId', function (req,res){
    const id = req.params.categoryId;
    Categoria.findById(id,function(error, cat){
        if(error){
            res.status(500).json({message:"Erro ao tentar encontrar categoria"});
        }
        else if(cat == null){
            res.status(400).json({message:"Categoria não encontrada para o Id: ", id});
        }
        else{
            res.status(200).json({message:"Retorno de todas as categorias", cat: cat}); 
        }
         
    });
});

//putbyId localhost:3000/api/categorias/Id
router.put('/:categoryId',function(req,res){
    const id = req.params.categoryId;
    console.log(id);
    Categoria.findById(id, function(error, cat){
        if(error){
            res.status(500).json({message:"Erro ao tentar encontrar categoria"});
        }
        else if(cat == null){
            res.status(400).json({message:"Categoria não encontrada para o Id: ", id});
        }
        else{
            cat.descricao = req.body.descricao;
            cat.save(function(error){
                if(error)
                   res.send("Erro ao tentar atualizar categoria", error);

                res.status(200).json({message:"Categoria atualizada com sucesso"}); 
            })
           
        }
    });
});

//deletebyId localhost:3000/api/categorias/Id
router.delete('/:categoryId', function (req, res){
    Categoria.findByIdAndRemove(req.params.categoryId,(error,cat)=>{
        if(error)
           res.status(500).send("Erro ao excluir categoria", error);

        const response ={
            message: "Categoria excluída com sucesso!",
            id: cat.id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;