var fs = require('fs');

module.exports = {
    "write":function(data, handler){
        fs.writeFile('datos.json', JSON.stringify(data), handler);
    },
    "read": function (handler) {
        fs.readFile('datos.json', handler);
    }
}