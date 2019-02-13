var express = require('express');
var router = express.Router();

router.post('/new', function (req, res, next) {
   var _userData = req.body;
   console.log(_userData);
   res.json({"msg":"ok"}); 
});

router.post('/login', function (req, res, next) {
   var _userData = req.body;
   console.log(_userData);
   res.json({"msg":"ok"}); 
});


module.exports = router;