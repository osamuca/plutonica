'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

<<<<<<< HEAD
=======
// router.post('/', (req, res, next) => {
//     res.status(201).send(req.body);
// });
/*
[/:id isto é uma variavel por tanto tem que ter cuidado com os conflitos]
*/
>>>>>>> bf8fee4e4b6f0e3dc9f1ea761098a1213f85dbc8
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
<<<<<<< HEAD
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;
=======
router.post('/', controller.post); 
router.put('/:id', controller.put); 
router.delete('/', controller.delete); 
// router.put('/:id', (req, res, next) => {
    // const id = req.params.id;
    // res.status(201).send({ 
    //     id: id, 
    //     item: req.body 
    // });
// });

// router.delete('/', (req, res, next) => {
//     // res.status(200).send(req.body);
// });

// router.get('/', (req, res, next) => {
//     res.status(200).send({
//         title: "Node API",
//         version: "0.0.2"
//     });
// });

module.exports = router;
>>>>>>> bf8fee4e4b6f0e3dc9f1ea761098a1213f85dbc8
