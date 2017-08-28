'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controllers');

// router.post('/', (req, res, next) => {
//     res.status(201).send(req.body);
// });
/*
[/:id isto é uma variavel por tanto tem que ter cuidado com os conflitos]
*/
router.get('/', controller.get);
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
