var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();


function empresaInit(db) {

    var fileModel = require('./jsonmodel');
    var mongoModel = require('./mongoModel')(db);
    var data = null;

    var datosEmpresa = {
        //'_RTN': '',
        'empresa': '',
        'correo': '',
        'rubro': '',
        'direccion': '',
        'telefono': '',
        'done': false
    }


    router.get('/all', function (req, res, next) {
        //Mongo Model
        mongoModel.getAllThings(
            function (err, docs) {
                if(err){
                    res.status(500).json({error:"Something went wrong :("});
                }
                return res.status(200).json(docs);
            }// getAllThings
        );

        /*
        File Model
        if (!data) {
            fileModel.read(function (err, filedata) {
                if (err) {
                    console.log(err);
                    data = [];
                    return res.status(500).json({ 'error': 'Error al obtener Data' });
                }
                data = JSON.parse(filedata);
                return res.status(200).json(data);
            });
        } else {
            return res.status(200).json(data);

        }*/
    }); // Metodo GET

    router.get('/byid/:thingId', (req, res,next)=>{
        mongoModel.getThingById(req.params.thingId, (err, thingDoc)=>{
            if(err){
                console.log(err);
                return res.status(500).json({"error":"Error al obtener informacion"});
            }
            return res.status(200).json(thingDoc);
        });//getThing By Id
    }); //by Id

    router.post('/new', function (req, res, next) {
    //Mongo Model
    var _thingsData = Object.assign({}, datosEmpresa, req.body);
    //_thingsData._RTN = uuidv4();
    mongoModel.addNewThings(_thingsData, (err, newThings)=>{
    if(err){
        console.log(err);
        return res.status(500).json({"error":"No se puede agregar"});
    }
    return res.status(200).json(newThings);

    });      
      /*File Model
        if (!data) {
            data = [];
        }
        data.push(_thingsData);
        fileModel.write(data, function (err) {
            if (err) {
                console.log(err);
                return res.status(500), json({ 'error': 'Error al obtener data' });
            }
            return res.status(200).json(_thingsData);
        });*/
    }); // Metodo POST

    router.put('/done/:thingId', function (req, res, next) {
        var _thingId = req.params._RTN;
        var _thingUpds = req.body;
        var _thingUpdated = null;
        var newData = data.map(
            function (doc, i) {
                if (doc._id == _thingId) {
                    _thingUpdated = Object.assign(
                        {},
                        doc,
                        { "done": true },
                        _thingUpds
                    );
                    return _thingUpdated;
                }
                return doc;
            }
        );

        data = newData;

        fileModel.write(data, function (err) {
            if (err) {
                console.log(err);
                return res.status(500), json({ 'error': 'Error al guardar data' });
            }
            return res.status(200).json(_thingUpdated);
        });
    }); // Metodo PUT

    router.delete('/delete/:thingId', function (req, res, next) {
        var _thingId = req.params.thingId;
        var newData = data.filter(
            function (doc, i) {
                if (doc._id == _thingId) {
                    return false;
                }
                return true;
            }
        );

        data = newData;
        fileModel.write(data, function (err) {
            if (err) {
                console.log(err);
                return res.status(500), json({ 'error': 'Error al eliminar data' });
            }
            return res.status(200).json({ "delete": _thingId });
        });
    }); // Metodo DELETE


    fileModel.read(function (err, filedata) {
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(filedata);
        }
    });

    return router;
}//empresaInit

module.exports = empresaInit;
