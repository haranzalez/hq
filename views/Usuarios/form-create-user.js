var btn = require('../componentes/btns.js');


module.exports = function(){
	
var btnsData = {
	action: {
		txt: 'Registrar',
		data: 'registrar',
		class: 'btn-ctr-form-user user-reg-btn'

	},
	cancel: {
		txt: 'Cancelar',
		data: 'cancel-form-btn-user',
		class: 'btn-ctr-form-user'
	}
}
	
	return '<div class="form-create-user">'+
	'<h2 class="title">Crear Usuario</h2>'+
	'<i class="fas fa-window-close users-close-forms-ctn-btn"></i>'+
	'<div class="ctn-col-10">'+
	'<form class="create-user-form" id="create-user-form" data-parsley-trigger="keyup" data-parsley-validate>'+
	'<input type="hidden" class="users-rol-input input-field" value="" name="id_rol" required>'+
	'<h3 class="sub-title-basic underlined">Informacion Personal</h3>'+

	'<div class="ctn form-elms-ctn-info">'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="nombres" type="text" text="" placeholder="Nombres" required data-parsley-required-message="Los nombres son requeridos.">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" type="text" text="" name="apellidos" placeholder="Apellidos" required data-parsley-required-message="Los apellidos son requeridos.">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="cedula" type="text" text="" placeholder="Cedula" required data-parsley-required-message="La cedula es requerida.">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="tel_fijo" type="text" text="" placeholder="Telefono Fijo">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="tel_mobil" type="text" text="" placeholder="Telefono Movil" required data-parsley-required-message="El telefono mobil se requiere.">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" type="text" name="email" text="" placeholder="Email Personal" require data-parsley-required-message="El email personal es requerido.">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="direccion" type="text" text="" placeholder="Direccion">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="ciudad" type="text" text="" placeholder="Ciudad">'+
		
		'</div> '+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="departamento" type="text" text="" placeholder="Departamento">'+
		
		'</div>'+

	'</div>'+



	'<h4 class="sub-title-basic underlined">Acceso</h4>'+

	'<div class="ctn form-elms-ctn-acceso">'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="email_interno" type="text" text="" placeholder="Email interno" required data-parsley-required-message="El email interno es requerido.">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" name="nombre_de_usuario" type="text" text="" placeholder="Nombre Usuario" required data-parsley-required-message="El email interno es requerido.">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p input-field" id="password" type="password" name="password" text="" placeholder="Password" required data-parsley-required-message="Porfavor entre un password.">'+
		
		'</div>'+

		'<div class="ctn-col-10">'+
		
			'<input class="text-box text-to-the-12p" type="password" text="" placeholder="Repetir password" data-parsley-equalto="#password" data-parsley-required-message="El password no coincide.">'+
		
		'</div>'+

	'</div>'+
	
	'<h4 class="sub-title-basic underlined">Estado</h4>'+

	'<div class="ctn form-elms-ctn-estado">'+

		'<div class="ctn-col-10 top-bottom-5">'+
			'<input type="radio" class="input-field" value="offline" name="estado" required data-parsley-required-message="El estado es requerido."><spam>Activo</spam>'+
		'</div>'+

		'<div class="ctn-col-10 top-bottom-5">'+
			'<input type="radio" class="input-field" value="inactivo" name="estado" required><spam>Inactivo</spam><br/>'+
		'</div>'+

	'</div>'+


	'<h4 class="sub-title-basic underlined">Rol</h4>'+

	'<div class="ctn form-elms-ctn-rol">'+

		'<div class="ctn-col-10">'+
			'<button class="sel-rol-btn" type="button"><i class="fas fa-plus"></i></button>'+
		'</div>'+

	'</div>'+

	
	'<h4 class="sub-title-basic underlined">Comentarios</h4>'+

	'<div class="ctn form-elms-ctn-comentario">'+

		'<div class="ctn-col-10">'+
		
		'<textarea name="comentario" class="comment-box input-field" placeholder="...."></textarea>'+
		
		'</div>'+

	'</div>'+
	
	'<div class="ctn-col-10">'+
	
	'<button class="'+btnsData.action.class+'" data-btn="'+btnsData.action.data+'" type="button">'+btnsData.action.txt+'</button>'+
	
	'</div>'+
	'</form>'+
	'</div></div>';
}












