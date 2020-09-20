// importando pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// configurando o app para usar o body-parse e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Persistencia
const connectionString = "mongodb+srv://aula:aula@cluster0.iuw65.mongodb.net/teste?retryWrites=true&w=majority";
mongoose.connect(connectionString,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

// definindo porta onde o server vai responder
const port = process.env.PORT || 3000;

// definindo as rotas
const router = express.Router(); // intercepta todas as rotas
const productRoute = require('./routes/product-route');
const indexRoute = require('./routes/index-route');

//rota principal
app.use('/api', indexRoute);

//rota para produto
app.use('/api/produtos/', productRoute);

app.listen(port, ()=>{
    console.log("server is up and running...on port ", port);
});



