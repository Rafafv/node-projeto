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
const productRoute = require('./src/routes/product-route');
const categoryRoute = require('./src/routes/categoria-route');
const indexRoute = require('./src/routes/index-route');

//rota principal
app.use('/api', indexRoute);

//rota para produto
app.use('/api/produtos/', productRoute);
// rota para categoria
app.use('/api/categorias/', categoryRoute);

app.listen(port, ()=>{
    console.log("server is up and running...on port ", port);
});



