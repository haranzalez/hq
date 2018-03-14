module.exports = {

	saveRepBox: function(){
		return '<div class="reports-saved-ctn">'+
			'<h2>Reportes Guardados</h2>'+
			'<div class="reports-saved-result-ctn"></div>'+
		'</div>';
	},

	savedRepRes: function(data){
		return '<div class="ctn">'+
			
			'<div class="ctn-col-8">'+
				'<p class="reports-saved-list-name">'+data.nombre+'</p>'+
				'<span class="reports-saved-list-date">'+data.fecha+'</span>'+
			'</div>'+
			'<div class="ctn-col-1" style="text-align:center;line-height:2;">'+
				'<button data-reportID="'+data.id+'" class="reports-saved-open-btn"><i class="fas fa-folder-open"></i></button>'+
			'</div>'+
			'<div class="ctn-col-1" style="text-align:center;line-height:2;">'+
				'<button class="reports-saved-del-btn"><i class="fas fa-times-circle"></i></button>'+
			'</div>'+
		'</div>';
	}




}