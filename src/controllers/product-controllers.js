'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.post = (req, res, next) => {
    // let product = new Product(req.body);
    /*
    var product = new Product(req.body);
    está forma pode ser usada porem é muito perigosa 
    dependendo do que está sendo feito.

    está é uma forma de se fazer que pode-se previnir 
    isso.     
    var product = new Product();
    product.title = req.body.title;
    */
    var product = new Product(req.body);
    // salva no banco de dados
    // é assincrono e retorna um promisse
    //product.save();
    product
        .save()
        .then(x => {
            res.status(201).send({ 
                message: 'Produto cadastrado com sucesso!'
            });
    }).catch(e => {
            res.status(400).send({ 
                message: 'Falha ao cadastrar o produto', 
                data: e
            })
    });
    // res.status(201).send(req.body);
};

exports.put = (req, res, next) => {
    res.status(201).send(req.body);
    const id = req.params.id;
    res.status(201).send({ 
        id: id, 
        item: req.body 
    });
};

exports.delete = (req, res, next) => {
    res.status(201).send(req.body);
};