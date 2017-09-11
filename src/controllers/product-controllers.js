'use strict';

// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
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
// exports.get = (req, res, next) => {
    // Product
    // .find({
    //     active: true
    // }, 'title price slug')

    // repository
//     return repository
//         .get()
//         then(data => {
//             res.status(201).send(data); 
//         }).catch(e => {
//             res.status(400).send(e);
//         });
// }
exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        // Cria o Blob Service
        // const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        // Salva a imagem
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        });

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://nodestr.blob.core.windows.net/product-images/' + filename
        });
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};



// exports.getBySlug = (req, res, next) => {
//     // Product
//     // .findOne({
//     //     // fazendo um filtro do produto
//     //     slug: req.params.slug,
//     //     active: true
//     // }, 'title description price slug tags')
//     repository
//         .getBySlug(req.params.slug)
//         .then(data => {
//             res.status(200).send(data); 
//         }).catch(e => {
//             res.status(400).send(e);
//         });
// }
// exports.getById = (req, res, next) => {
//     // Product
//     //         // // // fazendo um filtro do produto
//     // .findById('title description price slug tags')
//     repository
//         .getById(req.params.id)
//         .then(data => {
//             res.status(200).send(data); 
//         }).catch(e => {
//             res.status(400).send(e);
//         });
// }

// exports.getByTag = (req, res, next) => {
//     // Product
//     // .findOne({
//     //     // fazendo um filtro do produto
//     //     tags: req.params.tag,
//     //     active: true
//     // }, 'title description price slug tags')
//     repository
//         .getByTag(req.params.tag)
//         .then(data => {
//             res.status(200).send(data); 
//         }).catch(e => {
//             res.status(400).send(e);
//         });
// } 
// exports.post = (req, res, next) => {
//     // contract usado para não ficar usando varios ifs
//     let contract = new ValidationContract();
//     contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
//     contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
//     contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

//     // se os dados dorem inválidos
//     if (!contract.isValid()) {
//         res.status(400).send(contract.errors()).end();
//         return;
//     }

//     // let product = new Product(req.body);
//     /*
//     var product = new Product(req.body);
//     está forma pode ser usada porem é muito perigosa 
//     dependendo do que está sendo feito.

//     está é uma forma de se fazer que pode-se previnir 
//     isso.     
//     var product = new Product();
//     product.title = req.body.title;
//     */
    
//     // var product = new Product(req.body);

//     // salva no banco de dados
//     // é assincrono e retorna um promisse
//     //product.save();
//     // product
//     //     .save()
//     repository
//         .create(req.body)
//         .then(x => {
//             res.status(201).send({ 
//                 message: 'Produto cadastrado com sucesso!'
//             });
//     }).catch(e => {
//             res.status(400).send({ 
//                 message: 'Falha ao cadastrar o produto', 
//                 data: e
//             })
//     });
//     // res.status(201).send(req.body);
// };

// exports.put = (req, res, next) => {
//     // res.status(201).send(req.body);
//     /*
//     // const id = req.params.id;
//     // res.status(200).send({ 
//     //     id: id, 
//     //     item: req.body 
//     // });
//     */

//     // Product
//     //     .findByIdAndUpdate(req, params.id, {
//     //         // setando todas as requisições
//     //         $set: {
//     //             title: req.body.title,
//     //             description: req.body.description,
//     //             price: req.body.price,
//     //             slug: req.body.slug
//     //         }
//     //     })
//         repository
//             .update(req.params.id, req.body)
//             .then(x => {
//                 res.status(200).send({
//                     message: 'Produto atualizado com sucesso!'
//                 });
//             }).catch(e => {
//                 res.status(400).send({
//                     message: 'Falha ao atualizar o produto',
//                     date: e
//                 });
//             });
// };

// exports.delete = (req, res, next) => {
//     // res.status(201).send(req.body);
    
//     // Product
//     // .findByIdAndRemove(req.body.id) 
//     repository.delete(req.body.id)
//         .then(x => {
//             res.status(200).send({
//                 message: 'Produto removido com sucesso!'
//             });
//         }).catch(e => {
//             res.status(400).send({
//                 message: 'Falha ao remover o produto',
//                 date: e
//             });
//         });
// };
