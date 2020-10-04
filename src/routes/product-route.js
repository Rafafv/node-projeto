const express = require('express');
const router  = express.Router();
const productController = require('../controllers/product-controller');
const authService = require('../services/auth-service');


// rotas para Produto
//rota -> post localhost:3000/api/produtos
router.post("/", productController.post);

//rota -> get localhost:3000/api/produtos
router.get("/", productController.getAll);

//rota get com parametro -> getbyId localhost:3000/api/produtos/Id
router.get("/:productId",productController.getById)

//rota -> putbyId localhost:3000/api/produtos/Id
router.put("/:productId",productController.put);

//rota -> deletebyId localhost:3000/api/produtos/Id
router.delete("/:productId",productController.delete);

module.exports = router;