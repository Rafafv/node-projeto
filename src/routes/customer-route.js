const express = require('express');
const router  = express.Router();
const customerController = require('../controllers/customer-controller');

// rotas para Customer
//rota -> post localhost:3000/api/customers
router.post("/", customerController.post);

//rota -> get localhost:3000/api/customers
router.get("/", customerController.getAll);

//rota get com parametro -> getbyId localhost:3000/api/customers/Id
router.get("/:customerId",customerController.getById);

//rota -> putbyId localhost:3000/api/customers/Id
router.put("/:customerId",customerController.put);

//rota -> deletebyId localhost:3000/api/customers/Id
router.delete("/:customerId",customerController.delete);

module.exports = router;