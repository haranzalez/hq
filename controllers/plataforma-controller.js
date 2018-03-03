var api = require('../models/plataforma-model.js');
var template = require('../views');



module.exports = {


	ecosis: function(params){
		var privi = api.getPiviledges(params);
		privi.then(function(d){

			d.temp = 'plataforma';
			d.nombre_rol = params.nombre_rol;
			d.nombre_area = params.nombre_area;
			d.user = params.user;
			var t = template.build(d);
			params.res.send(t);
		}).catch(err => {
			console.log(err);
		})

	}




}