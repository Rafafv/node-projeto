// importando pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const morgan = require('morgan');
const mongoose = require('mongoose');

// configurando o app para usar o body-parse e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Persistencia
const connectionString = 'mongodb+srv://aula:aula@cluster0.iuw65.mongodb.net/teste?retryWrites=true&w=majority';
const connectionLogs = 'mongodb+srv://root:aula@cluster0.onwku.mongodb.net/dbLogs?retryWrites=true&w=majority';
global.DB_PRINCIPAL = mongoose.createConnection(connectionString,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});
global.DB_LOGS = mongoose.createConnection(connectionLogs,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});
// definindo porta onde o server vai responder
const port = process.env.PORT || 3000;


// definindo as rotas
const router = express.Router(); // intercepta todas as rotas
const productRoute = require('./src/routes/product-route');
const categoryRoute = require('./src/routes/categoria-route');
const indexRoute = require('./src/routes/index-route');
const customersRoute = require('./src/routes/customer-route');
const loginRoute = require('./src/routes/login-route');

//rota principal
app.use('/api', indexRoute);

//rota para produto
app.use('/api/produtos/', productRoute);
// rota para categoria
app.use('/api/categorias/', categoryRoute);
//rota para customer
app.use('/api/customers/', customersRoute);
//rota para login
app.use('/api/login/', loginRoute);


app.listen(port, ()=>{
    console.log("server is up and running...on port ", port);
});



