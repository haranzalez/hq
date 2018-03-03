var template = require('../views');
var crud = require('../models/users-model.js');
var messBox = require('../views/componentes/message-box.js');
var usersList = require('../views/Usuarios/usuarios.js');
var rolList = require('../views/Usuarios/roles.js');
var usersForm = require('../views/Usuarios/form-create-user.js');
var log = require('../views/Usuarios/logs.js');

module.exports = {
	getMain: function(req, res){
		var t = template.build('', 'users');
		res.send(t);
	},
//==============================================================================================================================================================
	getUserById: function(params, res){
		var result = crud.list('usuarios', params);
		result.dta.then(d => {
			for(var prop in d[0]){
				
				if(prop == 'id' || prop == 'id_usuario' || d[0][prop] == 'undefined'){
					
					delete d[0][prop];
				}
			
			}
			res.send(d[0]);
		})
	},
//==============================================================================================================================================================
	createUser: function(params, res, username){
		
		//Instamcia de base de datos se guarda en variable db
		var db = params.db;
		
		//PROCESO DE SANITACION
		//Aqui se organizan los valores correspondientes de cada tabla: [usuarios, cuentas, accesos, roles, comentarios]. 
		//Se remueve instancia de base de datos para prevenir conflicto con el CRUD
		delete params.db;

		//Al igual que la instancia de base de datos, estas variables provenientes del formulario [form-create-user]
		//son assignadas a variables locales en la funcion. Esto con el proposito de entrar los valores a sus respectivas tablas.
        var nombre_rol = params.nombre_rol;
        var estado = params.estado;
		var email_interno = params.email_interno;
		var password = params.password;
		var coment = params.comentario;
		var nombre_de_usuario = params.nombre_de_usuario;
		
		//Se remueven variables para evitar conflicto con el CRUD
		delete params.nombre_rol;
		delete params.estado;
		delete params.email_interno;
		delete params.password;
		delete params.comentario;
		delete params.nombre_de_usuario;

		//Se crea request y se envia al CRUD
		var parms = {
			db: db,
            funcion: "create_new_user",
			user: params,
			comentario: coment,
			email_interno: email_interno,
			password: password,
			nombre_rol: nombre_rol,
			nombre_de_usuario: nombre_de_usuario,
			estado: estado
		}

		//armar mensaje y retornar resultado.
		var result =  crud.create('', parms, username);
		result.then(d => {

			switch (d.type) {
				case 'success':
					res.send(messBox.success(d.mess));
					break;
				case 'warning':
					res.send(messBox.warning(d.mess));
					break;
				default:
                                // statements_def
                                break;
			}
			
		})
		

	},
//==============================================================================================================================================================
	
	updateUser: function(pkg, res, username){
		
		var dta = {
			cuenta: {
				estado: pkg.data.estado
			},
			acceso: {
				email_interno: pkg.data.email_interno,
				password: pkg.data.password,
				nombre_de_usuario: pkg.data.nombre_de_usuario
			},
			coment: {
				comentario: pkg.data.comentario
			},
			rol: {
				nombre_rol: pkg.data.nombre_rol
			}
		}


		delete pkg.data.estado;
		delete pkg.data.password;
		delete pkg.data.email_interno;
		delete pkg.data.comentario;
		delete pkg.data.nombre_rol;
		delete pkg.data.nombre_de_usuario;
		
		dta.user = pkg.data;
		
		var inst = {
			funcion: 'update_user',
			data: dta,
			record_id: pkg.record_id,
			bd: pkg.bd
		}
		
		var d = crud.update('', inst, username);
		
		switch (d.type) {
			case 'success':
				res.send(messBox.success(d.mes));
				break;
			case 'warning':
				res.send(messBox.warning(d.mes));
				break;
			default:
				// statements_def
				break;
		}

	},
//==============================================================================================================================================================
	delUser: function(pkg, res, username){
		
		var d = crud.delete('', pkg, username);
		switch (d.type) {
			case 'success':
				res.send(messBox.success(d.mes));
				break;
			case 'warning':
				res.send(messBox.warning(d.mes));
				break;
			default:
				// statements_def
				break;
		}
	},

//==============================================================================================================================================================
	sort: function(pkg, res){
		

		switch (pkg.type) {
			case 'usuarios':
				if(pkg.filter == 'todos'){
				pkg.funcion = 'select_users_with_access';
				var d = crud.list('', pkg);
					d.dta.then(dta => {
					dta.type = 'usuarios';
					var t = usersList(dta);
					res.send(t);
					})
				}else{
					var d = crud.list('', pkg);
					d.dta.then(dta => {
						dta.type = 'usuarios';
						var t = usersList(dta);
						res.send(t);
					})
				}
			break;
			case 'roles':
				if(pkg.filter == 'todos'){
					pkg.funcion = 'select_roles';
					var d = crud.listRol(pkg);
					d.then(d => {
						
						for (var i = 0; i < d[0].length; i++) {
								
								for(var prop in d[0][i]){
									if(prop == 'privilegios'){
										var arr = [];
										d[0][i][prop].forEach(function(e){
											arr.push(e);
											
										})
										
									}
								}
								
								d[0][i]['privilegios'] = arr;
							
						}

						
						d['type'] = 'roles';
						var t = rolList(d);
						res.send(t);

						
					}).catch(function (err) {
					  	console.log(err);
					});
				
				}else{
					var d = crud.listRol('', pkg);
					d.then(dta => {
						dta['type'] = 'roles';
						var t = rolList(dta);
						res.send(t);
					})
				}
			break;
			
			default:
				// statements_def
			break;
		}



		
		
		
	},
//==============================================================================================================================================================
	

	getComponent: function(req, res){

		switch (req.comp) {
			case 'formUsers':
				var headings = crud.list('',{bd: req.bd, funcion: 'table_headings_users'});
				headings.dta.then(d => {
					var pkg = {};
					for(var prop in d){
						
						if(d[prop].column_name == 'id' || d[prop].column_name == 'id_usuario' || d[prop].column_name == 'id_cuenta'){
							continue;
						}else{
							pkg[d[prop].column_name] = d[prop].column_name;
						}
					}
			
					res.send(usersForm(pkg));
					
				})
				

				//usersForm(h_usuarios,h_accesos,h_cuentas,h_rols,h_comments)
			break;
			default:
				// statements_def
				break;
		}



	},

//==============================================================================================================================================================
	search: function(pkg, res){
		var result = crud.list('', pkg);

		result.dta.then(function(d){
			
			d.type = 'usuarios';
			var t = usersList(d);
			
			res.send(t);
		})

	},
//==============================================================================================================================================================
	block: function(pkg, res, username){
		var result = crud.blockUser(pkg, username);

		
		res.send(messBox.success(result.mess));
	
	},
//==============================================================================================================================================================
	unblock: function(pkg, res, username){
		var result = crud.unblockUser(pkg, username);

		
		res.send(messBox.success(result.mess));
	
	},
//==============================================================================================================================================================
	getLog: function(pkg, res){
		
		
		switch (pkg.type) {
			case 'logins':
			    var result = crud.getLog_LoginsById(pkg);
				result.then(d => {
					if(d.mess){
						res.send({mess: messBox.warning(d.mess)});
					}else{
						var t = log.getTable({type: 'underlined_mobil', obj: d});
						res.send(t);
					}
					
				})
			break;
			case 'fallidos':
			    var result = crud.getLog_LoginsFallidos(pkg);
				result.then(d => {
					if(d.mess){
						res.send({mess: messBox.warning(d.mess)});
					}else{
						var t = log.getTable({type: 'underlined_mobil', obj: d});
						res.send(t);
					}
				})
			break;
			case 'passwords':
			    var result = crud.getLog_LoginsById(pkg);
				result.then(d => {
					if(d.mess){
						res.send({mess: messBox.warning(d.mess)});
					}else{
						var t = log.getTable({type: 'underlined_mobil', obj: d});
						res.send(t);
					}
				})
			break;
			default:
				// statements_def
			break;
		}

		
	}



















}
