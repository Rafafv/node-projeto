const express = require('express');
const router = express.Router();


router.use(function(req, res, next){
    console.log("Interceptação pelo middleware"); //autenticacoes
    next();
});

router.get('/', (req, res) => res.send("teste ok"));

module.exports = router;