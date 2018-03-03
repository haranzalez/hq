var ctr = require('../controllers/roles-controller.js');

module.exports = function(app,db, sessionChecker){

	app.post('/roles/crear/', sessionChecker, function(req, res){
            var username = req.session.user;
		req.body.db = db;
		var result = ctr.crearRol(req.body, res, username);
	});
	app.post('/roles/update/', sessionChecker, function(req, res){
            var username = req.session.user;
		req.body.db = db;
		var result = ctr.updateRol(req.body, res, username);

	});
	app.post('/roles/update/name/', sessionChecker, function(req, res){
            var username = req.session.user;
		var pkg = {
			db: db,
			data: {
				nombre_rol: req.body.nombre_rol
			},
			funcion: 'record',
			record_id: req.body.id_rol
		}
		var result = ctr.updateRolName(pkg, res, username);
	})

}