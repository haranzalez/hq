module.exports = function(){

	return '<div class="bg-image"></div><div class="login-bg">'+
	'<div class="ctn-col-10 text-center top-50-px">'+
	'<div class="logo-ctn"><img style="width:150px;" src="/estaticos/img/hqlogo2.png" ></div>'+
	'</div>'+
	'<div class="ctn-login"><div class="ctn-col-10 text-center top-10-per">'+
	'</div>'+
	
	'<form class="login-form" data-parsley-trigger="keyup" data-parsley-validate>'+
	'<h3 class="title-basic">Sistema CST - Ingreso</h3>'+
	'<div class="ctn-col-10 bottom-10-per">'+
	'<i class="fa fa-user text-box-icon" aria-hidden="true"></i>'+
	'<input name="user" class="text-box text-box-login" type="text" placeholder="Usuario" required data-parsley-required-message="Porfavor escriba su nombre de usuario.">'+
	'</div>'+
	'<div class="ctn-col-10">'+
	'<i class="fa fa-lock text-box-icon" aria-hidden="true"></i>'+
	'<input name="pass" class="text-box text-box-login" type="password" placeholder="Password" required data-parsley-required-message="Porfavor escriba su password.">'+
	'</div>'+
	'<div class="ctn-col-10">'+
	'<button type="button" class="btn-basic login-btn-ctr top-20-per">Entrar</button>'+
	'</div>'+
	'</form></div></div>';

};



