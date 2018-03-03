module.exports = {

	regular: function(mes){
		return '<div class="message-box-ctn"><div class="message-box">'+
			'<h2>Mensaje</h2>'+
			'<p>'+mes+'</p>'+
			'<div class="btn-ctn">'+
			'<button class="btn-basic mess-box-btn" data-btn="cancel">Ok</button>'+
			'</div>'+
		'</div></div>';
	},
	warning: function(mes){
		return '<div class="message-box-ctn"><div class="message-box warning-box">'+
			'<h2><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Atencion!</h2>'+
			'<p>'+mes+'</p>'+
			'<div class="btn-ctn">'+
			'<button class="btn-basic mess-box-btn" data-btn="cancel">Ok</button>'+
			'</div>'+
		'</div></div>';
	},
	warning_delete: function(mes, btn_dta){
		return '<div class="message-box-ctn"><div class="message-box warning-box">'+
			'<h2><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Atencion!</h2>'+
			'<p>'+mes+'</p>'+
			'<div class="btn-ctn">'+
			'<button class="btn-basic mess-box-btn" data-btn="'+btn_dta+'">Continuar</button>'+
			'<button class="btn-basic mess-box-btn" data-btn="cancel">Cancelar</button>'+
			'</div>'+
		'</div></div>';
	},
	success: function(mes){
		return '<div class="message-box-ctn">'+
			'<div class="message-box success-box">'+
				'<h2><i class="fa fa-check" aria-hidden="true"></i> Exito!</h2>'+
				'<p>'+mes+'</p>'+
				'<div class="btn-ctn">'+
				'<button class="btn-basic mess-box-btn" data-btn="ok">Ok</button>'+
				'</div>'+
			'</div>'+
		'</div>';
	},
	RolName: function(){
		return '<div class="message-box-ctn"><div class="message-box form-box">'+
			'<h2>Nuevo nombre</h2>'+
			'<input type="text" class="text-box">'+
			'<div class="btn-ctn">'+
			'<button class="btn-basic btn-ctr-form-rol mess-box-btn" data-btn="update-rol-name">Actualizar</button>'+
			'<button class="btn-basic mess-box-btn" data-btn="cancel">cancelar</button>'+
			'</div>'+
		'</div></div>';
	}



}