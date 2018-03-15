const ctl = require('../controllers/registros-controller.js');

module.exports = function(app, db){

    app.get('/registros', function(req, res){

        var params = {
            db: db,
            res: res
        }
        ctl.getRegistros(params);

    })



}