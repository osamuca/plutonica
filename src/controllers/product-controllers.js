'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validators');
const repository = require('../repositories/product-repository');

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
    // Product
    // .find({
    //     active: true
    // }, 'title price slug')
    repository
        .then(data => {
            res.status(201).send(data); 
        }).catch(e => {
            res.status(400).send(e);
        });
}
exports.getBySlug = (req, res, next) => {
    // Product
    // .findOne({
    //     // fazendo um filtro do produto
    //     slug: req.params.slug,
    //     active: true
    // }, 'title description price slug tags')
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data); 
        }).catch(e => {
            res.status(400).send(e);
        });
}
exports.getById = (req, res, next) => {
    // Product
    //         // // // fazendo um filtro do produto
    // .findById('title description price slug tags')
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data); 
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    // Product
    // .findOne({
    //     // fazendo um filtro do produto
    //     tags: req.params.tag,
    //     active: true
    // }, 'title description price slug tags')
    repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data); 
        }).catch(e => {
            res.status(400).send(e);
        });
} 
exports.post = (req, res, next) => {
    // contract usado para não ficar usando varios ifs
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // se os dados dorem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

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
    
    // var product = new Product(req.body);

    // salva no banco de dados
    // é assincrono e retorna um promisse
    //product.save();
    // product
    //     .save()
    repository
        .create(req.body)
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
    // res.status(201).send(req.body);
    /*
    // const id = req.params.id;
    // res.status(200).send({ 
    //     id: id, 
    //     item: req.body 
    // });
    */

    // Product
    //     .findByIdAndUpdate(req, params.id, {
    //         // setando todas as requisições
    //         $set: {
    //             title: req.body.title,
    //             description: req.body.description,
    //             price: req.body.price,
    //             slug: req.body.slug
    //         }
    //     })
        repository
            .update(req.params.id, req.body)
            .then(x => {
                res.status(200).send({
                    message: 'Produto atualizado com sucesso!'
                });
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao atualizar o produto',
                    date: e
                });
            });
};

exports.delete = (req, res, next) => {
    // res.status(201).send(req.body);
    
    // Product
    // .findByIdAndRemove(req.body.id) 
    repository.delete(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto',
                date: e
            });
        });
};
