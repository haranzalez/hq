


var formUsers = require('./form-create-user.js');
var formRol = require('./form-create-rol.js');
var usersTbl = require('./usuarios.js');
var rolTbl = require('./roles.js');
var logs = require('./logs.js');
var selRolWindow = require('./sel-rol-window.js');
var searchBox = require('./search-box.js');
var sortMenu = require('../componentes/menues.js');



module.exports = function(){
	return selRolWindow.container()+'<div id="module-users" class="ctn"><div class="ctn-col-10"><div class="users-module-ctn">'+
	
		//section btns users and roles
		'<div class="user-module-nav-btns">'+
			'<button class="btn" data-btn="usuarios">Usuarios</button>'+
			'<button class="btn" data-btn="roles">Roles</button>'+
		'</div>'+
		//Section tools [search bar, filter]
		'<div class="ctn user-module-tool-bar">'+
			'<div class="ctn-col-5">'+
			'<div class="sub-menues">'+
				sortMenu('sub-users')+
			'</div>'+
			'</div>'+
			
			'<div class="ctn-col-5">'+
			     searchBox.regular()+
			'</div>'+
		'</div>'+
		//forms ctn

		//results ctn
		'<div class="users-main-ctn">'+
			'<div class="users-forms-ctn">'+formUsers()+'</div>'+
			'<div class="list-result-ctn"></div>'+
		'</div>'+
	'</div></div>'+
	'</div>'; 
}


/*'<div class="user-status-table"><h2 class="sub-title-basic">Usuarios en linea</h2><ul></ul></div>'+*/
	/*searchBox.regular()+selRolWindow.container()+
	'<div class="sub-menues">'+
	sortMenu('sub-users')+
	'</div>'+
	'<div class="list-result-ctn"></div>'+
	'</div>';*/