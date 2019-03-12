var express = require('express');
var router = express.Router();

function apiInit(db) {
    var usersApi = require('./api/users');
    var empresasApi = require('./api/empresa')(db);

    router.use('/users', usersApi);
    router.use('/empresas', empresasApi);

    return router
}

module.exports = apiInit;