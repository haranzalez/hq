var formCreateRol = require('../views/Usuarios/form-create-rol.js');
var messageBox = require('../views/componentes/message-box.js');
var selRolWindow = require('../views/Usuarios/sel-rol-window.js');
var componentsModel = require('../models/components-model.js');
var menues = require('../views/componentes/menues.js');
var moduleTools = require('../views/componentes/module-tools.js')
var secModuleTools = require('../views/componentes/module-sec-tools.js')


module.exports = {

	getComponent: function(params, db, res){//PARAMS: [ID, extra(usually message), id_acceso(optional)], Data base conection, request result 
		switch (params.id) {
			case "f2"://form to create rol
				var result = componentsModel.privilegiosYareas(db);
				result.then(function(d){
					var component = formCreateRol.mainForm(d);
					res.send(component);
				})

			break;
			case "w1"://window 1 for areas
				var result = componentsModel.getAreas(db);

				result.then(function(pkg){
					console.log(pkg);
					res.send(selRolWindow.renderAreas(pkg));
				})

				
			break;
			case "w2"://window 2 for roles
				
				var result = componentsModel.getRoles(db, params.extra);
				result.then(function(pkg){
					
					res.send(selRolWindow.renderRoles(pkg));
				})

				
			break;
			case "bf1"://Box Form 1 ro rol name editing

					res.send(messageBox.RolName());

			break;
			case "bw"://Box window one for warning
					res.send(messageBox.warning(params.extra));
			break;
			case "boxBasic"://Box window one for warning
					return messageBox.regular(params.extra);
			break;
			case "awb"://Action waring box [confirm and cancel]
					res.send(messageBox.warning_delete(params.extra, params.id_acceso));
			break;
			case "sub-menu-roles"://for roles
					res.send(menues(params.extra));
			break;
			case "sub-menu-users"://for roles
					res.send(menues(params.extra));
			break;
			case "sub-user-logs"://for user logs
					console.log(params);
					res.send(menues(params.id, {id_acceso: params.id_acceso}));
			break;
			case "moduleTools"://for user logs
					
					res.send(moduleTools(params.extra));
			break;
			case "secModuleTools"://for user logs
					
					res.send(secModuleTools(params.extra));
			break;
			case "mesBoxTextInput"://for user logs
					
					res.send(messageBox.mesBoxTextInput(params));
			break;
			case "confirm"://for user logs
					
					params = {
						mess: params.extra,
						class: params.id_acceso,
						data: params.param
					}

					res.send(messageBox.confirm(params));
			break;


			default:
				// statements_def
				break;
		}
	}



}