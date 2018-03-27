var ctr = require('../controllers/components-controller.js');

module.exports = function(app, db, sessionChecker){

	app.get('/recursos/componentes/:id/:extra/:id_acceso/:param',sessionChecker, function(req, res){
		
		ctr.getComponent(req.params, db, res);
		
  		
  	});

}