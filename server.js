// importando pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// mongoose-morgan
const morgan = require('mongoose-morgan');

// configurando o app para usar o body-parse e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Persistencia
const connectionString = "mongodb+srv://aula:aula@cluster0.iuw65.mongodb.net/teste?retryWrites=true&w=majority";
mongoose.createConnection(connectionString,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

//log
app.use(morgan({
    collection: 'logs',
    connectionString: connectionString
    },
    {
    skip: function (req, res) {
        return res.statusCode = 201;
    }
   },
   'json'
));

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



