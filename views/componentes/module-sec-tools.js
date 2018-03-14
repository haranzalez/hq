module.exports =function(module){

	switch (module) {
		case 'users':
			return '<div class="ctn-col-3">'+require('../Usuarios/search-box.js').regular()+'</div><div class="ctn-col-3 users-filter-nav">'+require('../componentes/menues.js')('sub-users')+'</div>';
		break;
		case 'reports':
			return '<div class="ctn-col-3"></div>';
		break;
		default:
			// statements_def
		break;
	}


}