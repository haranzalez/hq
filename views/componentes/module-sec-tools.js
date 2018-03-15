module.exports =function(module){

	switch (module) {
		case 'users':
			return '<div class="ctn-col-3">'+require('../Usuarios/search-box.js').regular()+'</div><div class="ctn-col-3 users-filter-nav">'+require('../componentes/menues.js')('sub-users')+'</div>';
		break;
		case 'reports':
		var style = "line-height: 3.3;text-align: left;height: 56px;padding: 0px 23px;";
			return '<div class="ctn-col-3" style="'+style+'">'+
			'<input type="text" placeholder="Rec ID" class="report-rec-id-input">'+
			'<select class="report-add-to-table-select" name="add_to">'+
                '<option value="">Agregar a...</option>'+
            '</select>'+   
			'</div>';
		break;
		case 'registros':
		var style = "line-height: 3.3;text-align: left;height: 56px;padding: 0px 23px;";
			return '<div class="ctn-col-3" style="'+style+'">'+
			'<input type="text" placeholder="Ej: john.doe" class="registros-filter-input-box">'+
			'<select class="rregistros-filter-select">'+
				'<option value="">Nombre de usuario</option>'+
				'<option value="">Fecha</option>'+
				'<option value="">Hora</option>'+
				'<option value="">Tabla</option>'+
				'<option value="">Operacion</option>'+
            '</select>'+   
			'</div>';
		break;
		default:
			// statements_def
		break;
	}


}