var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

var fileModel = require('./jsonmodel');
var datos = null;
var empresas = {
    'RTN':'',
    'empresa':'',
    'correo':'',
    'rubro':'',
    'direccion':'',
    'telefono':''
};

router.get('/', function (req, res, next) {
   res.json({
       'cuenta':"0801199800563",
       "nombre":"Franco Fuentes",
       "version":"0.0.1"
   });
});
router.get('/all', function (req, res, next) {
    if(!datos){
        fileModel.read(function(err, filedata){
            if(err){
                console.log(err);
                datos = [];
                return res.status(500).json({'Error':'No se obtuvieron datos'});
            }
            datos = JSON.parse(filedata);
            return res.status(200).json(datos);
        });
    }else{
        return res.status(200).json(datos);
    }
});

router.post('/new', function (req, res, next) {
   var _nuevaEmpresa = Object.assign({},empresas,req.body);
   _nuevaEmpresa.RTN = uuidv4();
    if(!datos){
        datos = [];
    }
    datos.push(_nuevaEmpresa);
    fileModel.write(datos, function (err) {
        if(err){
            console.log(err);
            return res.status(500).json({'Error':' No se obtuvieron datos'});
        }
        return res.status(200).json(_nuevaEmpresa);
        
    });
});

router.put('/done/:empresaID', function (req, res, next) {
   var _empresaID= req.params._empresaID;
   var _empresaAct = req.body;
   var _empresaActualizacion = null;
   var nuevosDatos = data.map(
    function (doc, i) {
        if(doc._empresaID == _empresaID){
            _empresaActualizacion = Object.assign(
                {},
                doc,
                {"Cambio realizado":true},
                _empresaAct
            );
            return _empresaActualizacion;
        }
        return doc;
    }
   );
    datos = nuevosDatos;
    fileModel.write(datos, function (err) {
        if(err){
            console.log(err);
            return res.status(500).json({'Error':'No se obtuvieron datos'});
        }
        return res.status(200).json(_empresaActualizacion);        
    });  
    }  
});


module.exports = router;

