const model = require('../models/registros-model.js');
const tblTemplate = require('../views/Registros');


module.exports = {


    getRegistros: function(params){

        var result = model.getAllRegistros(params.db);
        result.then(d => {
            params.res.send(d);
        })



    }




}