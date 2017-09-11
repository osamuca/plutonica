'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
<<<<<<< HEAD
const authService = require('../services/auth-service');

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);
=======
// const authService = require('../services/auth-service');

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
// router.post('/refresh-token', authService.authorize, controller.refreshToken);
>>>>>>> bf8fee4e4b6f0e3dc9f1ea761098a1213f85dbc8

module.exports = router;