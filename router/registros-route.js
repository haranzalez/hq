const ctl = require('../controllers/registros-controller.js');

module.exports = function(app, db, sessionChecker){

    app.get('/registros',sessionChecker, function(req, res){

        var params = {
            db: db,
            res: res
        }
        ctl.getRegistros(params);

    })



}