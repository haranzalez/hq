var crud = require('../models/users-model.js');
var messBox = require('../views/componentes/message-box.js');


module.exports = {


	crearRol: function(pkg, res, username){
		
		var result = crud.createRol(pkg, username);
		res.send(messBox.success(result.mess));
	},

	updateRol: function(pkg, res, username){
		var result = crud.updateRol(pkg, username);
		res.send(messBox.success(result.mess));
	},

	updateRolName: function(pkg, res, username){
		var result = crud.update('roles', pkg, username);
		res.send(messBox.success(result.mess));
		
	}




}