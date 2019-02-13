var express = require('express');
var router = express.Router();

var usersApi = require('./api/users');
var empresasApi = require('./api/empresa');

router.use('/users', usersApi);
router.use('/empresas', empresasApi);

module.exports = router;