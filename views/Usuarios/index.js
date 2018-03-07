


var formUsers = require('./form-create-user.js');
var formRol = require('./form-create-rol.js');
var usersTbl = require('./usuarios.js');
var rolTbl = require('./roles.js');
var logs = require('./logs.js');
var selRolWindow = require('./sel-rol-window.js');
var searchBox = require('./search-box.js');
var sortMenu = require('../componentes/menues.js');



module.exports = function(){
	return selRolWindow.container()+

'<div id="module-users" class="ctn">'+

	'<div class="ctn-col-5">'+

		'<div class="ctn users-roles-table">'+
			
			'<div class="ctn-col-10">'+

				'<div class="users-module-ctn">'+
					//Section tools [search bar, filter]
					'<div class="ctn user-module-tool-bar">'+
						'<div class="ctn-col-10">'+
							'<h2 class="title"></h2>'+
						'</div>'+
						
						

					'</div>'+
					//forms ctn

					//results ctn
					'<div class="users-main-ctn">'+
						'<div class="list-result-ctn"></div>'+
					'</div>'+

				'</div>'+

			'</div>'+

	  	'</div>'+

	'</div>'+


	'<div class="ctn-col-5 users-forms-ctn">'+

		
		

	'</div>'+





		
'</div>'; 
}


/*'<div class="user-status-table"><h2 class="sub-title-basic">Usuarios en linea</h2><ul></ul></div>'+*/
	/*searchBox.regular()+selRolWindow.container()+
	'<div class="sub-menues">'+
	sortMenu('sub-users')+
	'</div>'+
	'<div class="list-result-ctn"></div>'+
	'</div>';*/