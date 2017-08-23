'use strict'
// const live = require('live-server');
const http = require('http');
const express = require('express')('nodestr:server');
const debug = require('debug');
// server
const app = express;
// const port = 3000;
const port = normalizePort(peocess.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();
// rota
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        version: '0.0.1'
    });
});
app.use('/', route);
// escutando a porta
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta' + port);
// normalizando a porta [pegando a que está disponivel]
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
// erros
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// startando o debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug('Listening on ' + bind);
}