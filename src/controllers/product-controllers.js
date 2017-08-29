'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
/**
 * Primeiro code get que fiz.
 * 
 * exports.get = (req, res, next) => {
    product
    .find({
        // filtrando e buscando somente o necessário.
        active: true}, 'title price slug')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
} 
**/
exports.get = (req, res, next) => {
    Product
    .find({
        active: true
    }, 'title price slug')
    .then(data => {
        res.status(201).send(data); 
    }).catch(e => {
        res.status(400).send(e);
    });
}
exports.getBySlug = (req, res, next) => {
    Product
    .findOne({
        // fazendo um filtro do produto
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data); 
    }).catch(e => {
        res.status(400).send(e);
    });
}
exports.getById = (req, res, next) => {
    Product
            // // // fazendo um filtro do produto
    .findById('title description price slug tags')
    .then(data => {
        res.status(200).send(data); 
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getByTag = (req, res, next) => {
    Product
    .findOne({
        // fazendo um filtro do produto
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data); 
    }).catch(e => {
        res.status(400).send(e);
    });
} 
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