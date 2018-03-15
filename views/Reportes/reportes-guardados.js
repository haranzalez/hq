module.exports = {

	saveRepBox: function(){
		return '<div class="reports-saved-ctn">'+
			'<h2>Reportes Guardados</h2>'+
			'<div class="reports-saved-result-ctn"></div>'+
		'</div>';
	},

	savedRepRes: function(data){
		return '<div class="ctn">'+
			
			'<div class="ctn-col-9">'+
				'<a href="#" type="button" class="reports-saved-list-name reports-saved-open-btn" data-reportID="'+data.id+'">'+data.nombre+'</a><br>'+
				'<span class="reports-saved-list-date">Creado: '+data.fecha+'</span>'+
			'</div>'+
			'<div class="ctn-col-1" style="text-align:center;line-height:2;">'+
				'<button class="reports-saved-del-btn" data-reportID="'+data.id+'"><i class="fas fa-times-circle"></i></button>'+
			'</div>'+
		'</div>';
	}




}