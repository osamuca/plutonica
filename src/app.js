'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// conecta com banco de dados
mongoose.connect('mongodb://verneck:cabrito@ds159493.mlab.com:59493/api');

// carrega os models
const Product = require('./models/product');

// carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

// rota
// const route = router.get('/', (req, res, next) => {
//     res.status(200).send({
//         title: "Node API",
//         version: "0.0.1"
//     });
// });

// rota
// const create = router.post('/', (req, res, next) => {
//     res.status(201).send(req.body);
// });
// const put = router.put('/:id', (req, res, next) => {
//     const id = req.params.id;
//     res.status(201).send({ 
//         id: id, 
//         item: req.body 
//     });
// });
// const del = router.delete('/', (req, res, next) => {
//     res.status(200).send(req.body);
// });

// metodos
// atribuiação da rota ao app

// app.use('/', route);
app.use('/', indexRoute);
app.use('/products', productRoute);
// app.use('/products', put);
// app.use('/products', del);

// exportação da aplicação
module.exports = app;