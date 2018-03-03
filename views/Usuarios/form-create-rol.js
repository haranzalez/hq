var btns = require('../componentes/btns.js');

module.exports = {

	mainForm: function(pkg){
		var btnsData = {
		action: {
			txt: 'Crear Rol',
			data: 'crear-rol',
			class: 'btn-ctr-form-rol'

		},
		cancel: {
			txt: 'Cancelar',
			data: 'cancel-form-btn-rol',
			class: 'btn-ctr-form-rol'
		}
	}
	
	return '<div class="form-create-rol">'+
	'<form id="create-rol-form" data-parsley-trigger="keyup" data-parsley-validate>'+
	'<div class="ctn">'+
	'<div class="ctn-col-10">'+
	'</div>'+
	'<div class="ctn-col-10 bottom-40-px">'+
	'<p class="sub-title-basic underlined">Escriba nombre para nuevo rol..</p>'+
	'<input name="nombre_rol" class="text-box" type="text" required data-parsley-required-message="Se requiere un nombre">'+
	'</div>'+
	'<div class="ctn-col-10 bottom-40-px">'+
	'<p class="sub-title-basic underlined">Seleccione area..</p>'+
	'<select name="id_area" id="" class="select-basic-mobil" required>'+
	renderAreas(pkg.areas)+
	'</select>'+
	'</div>'+
	'<div class="ctn-col-10 bottom-40-px">'+
	'<p class="sub-title-basic underlined text-to-the-left">Seleccione modulos..</p>'+
	'<div class="privilegios-ctn">'+
	'<div class="ctn text-center">'+
	renderPriviledges(pkg.privilegios)+
	'</div>'+
	'</div>'+
	'</div>'+
        '<div class="ctn-col-10 bottom-40-px">'+
	'<p class="sub-title-basic underlined text-to-the-left">Seleccione privilegios..</p>'+
        '<div class="ctn">'+
        '<div class="ctn-col-quarter">'+
            '<p class="text-to-the-8p">Puede crear</p>'+
            '<input name="poderes" type="checkbox" value="create" data-name="create">'+
        '</div>'+
        
        '<div class="ctn-col-quarter">'+
            '<p class="text-to-the-8p">Puede editar</p>'+
            '<input name="poderes" type="checkbox" value="update" data-name="update">'+
        '</div>'+
        
        '<div class="ctn-col-quarter">'+
            '<p class="text-to-the-8p">Puede eliminar</p>'+
            '<input name="poderes" type="checkbox" value="delete" data-name="delete">'+
        '</div>'+
        '</div>'+

	'</div>'+
	'<div class="ctn-col-10 bottom-40-px">'+
	btns('set-action-cancel', btnsData)+
	'</div>'+
	'</div>'+
	'</form>'+
	'</div>';


	}



}

function renderPriviledges(pkg){
	var html = '';
	for(var prop in pkg){
		html = html+'<div class="ctn-col-quarter">'+
		'<p class="text-to-the-8p">'+pkg[prop].nombre_privilegio+'</p>'+
		'<input name="privilegios" type="checkbox" value="'+pkg[prop].nombre_privilegio+'" data-name="'+pkg[prop].nombre_privilegio+'">'+
		'</div>';
	}
	return html;
}

function renderAreas(pkg){
	var html = '';
	for(var prop in pkg){
		html = html+'<option value="'+pkg[prop].id_area+'">'+pkg[prop].nombre_area+'</option>';
	}
	return html;
}








