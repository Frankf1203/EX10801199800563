var ObjectId = require("mongodb").ObjectID;


function mongoModel(db) {
    var lib = {};
    var empresa = db.collection('empresa');

    lib.getAllThings = (handler)=>{
    empresa.find({}).toArray(
        (err, docs) =>{
        if (err) {
            handler(err, null);
        }
        else{
            handler(null, docs);
        }
    }
    );
    }//getAllThings

    lib.getThingById = (thingId, handler)=>{
        empresa.findOne({"_id":  new ObjectId(thingId)}, (err, doc)=>{
        if (err) {
            handler(err, null);
        }
        else{
            handler(null, doc);
        }
        }); // find One
    }//getThingById

    lib.addNewThings = (newThings, handler)=> {
        empresa.insertOne(newThings, (err, r)=>{
            if(err){
                handler(err,null);
            }
            else{
                handler(null, r.result);
            }
        });
    }// NewThings

    return lib;
}//mongoModel

module.exports = mongoModel;