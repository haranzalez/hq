var template = require('../views');
var crud = require('../models/plataforma-model.js');
var messBox = require('../views/componentes/message-box.js');




module.exports = {

	login: function(pkg, req, res){
		
		var result = crud.login(pkg, req);
		result.then(r => {
			
			switch (r.mess) {

				case 'success':
					req.session.user = r.user;
					req.session.id_cuenta = r.id_cuenta;
					req.session.id_usuario = r.id_usuario;
					req.session.id_rol = r.id_rol;
					req.cookies.id_acceso = r.id_acceso;

					res.send({
						mess: 'granted', 
						id_rol: r.id_rol,
					    nombre_rol: r.nombre_rol, 
					    nombre_area: r.nombre_area
					});
					
					
				break;
				case 'wrong user':
				    res.send(messBox.warning('Nombre de usuario incorrecto.'))
				break;
				case 'wrong pass':
					res.send(messBox.warning('Password incorrecto.'))
				break;
				case 'inactivo':
					res.send(messBox.warning('Su cuenta esta inactiva. Porfavor contacte al administrador.'))
				break;
				default:
					
				break;
			}
			
		})
		
		
	},

	loginForm: function(res){
		res.send(template.build({temp:'login'}))
	},

	signOut: function(pkg, res){
		crud.signOut(pkg)
	}
}








