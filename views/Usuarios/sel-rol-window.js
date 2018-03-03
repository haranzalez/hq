var btns = require('../componentes/btns.js');

module.exports = {

	renderAreas: function(pkg){

		

			var html = '<div class="ctn-col-10 zero-margin">'+
			'<h2 class="zero-margin">Seleccione Area</h2>'+
			'</div>';

			for(var prop in pkg){
				html = html+'<div class="ctn-col-thirds btn-ctr-form-rol" data-id="'+pkg[prop]['id_area']+'" data-btn="sel-area-btn" data-img="http://placehold.it/50">'+
					'<img src="http://placehold.it/80" alt="" class="avatar">'+
					'<p class="text-center text-to-the-10p">'+pkg[prop]['nombre_area']+'</p>'+
				'</div>';
			}


			return html;
   			

		
	},

	renderRoles: function(pkg){
		
		if (pkg.length > 0) {
			var html = '<div class="ctn-col-10 zero-margin">'+
			'<h2 class="zero-margin">Seleccione Rol</h2>'+
			'</div>';

			for(var prop in pkg){
				html = html+'<div class="ctn-col-thirds btn-ctr-form-rol" data-btn="sel-rol-btn" data-name="'+pkg[prop]['nombre_rol']+'" data-img="http://placehold.it/50">'+
					'<img src="http://placehold.it/80" alt="" class="avatar">'+
					'<p class="text-center text-to-the-10p"><a class="btn-rol-ctr" href="#" data-id="'+pkg[prop]['id_rol']+'">'+pkg[prop]['nombre_rol']+'</a></p>'+
				'</div>';
			}


			return html;
		}else{
			var html = '<div class="ctn-col-10 zero-margin">'+
			'<h2 class="zero-margin">Seleccione Rol</h2>'+
			'</div>'+
			'<div class="ctn-col-10 btn-ctr-form-rol">'+
				'<p class="top-bottom-25"><i class="fa fa-times" aria-hidden="true"></i> Aun no se han creado roles en esta area.</p>'+
			'</div>';



			return html;
		}
	},

	container: function(){
		return '<div class="mobile-window-ctn shadow-it">'+
                '<button class="back-btn helper-btn btn-transparent" style="left: 20px;top: 20px;" data-btn="back-btn-roles">'+
                    '<i class="fa fa-arrow-left" aria-hidden="true"></i>'+
                '</button>'+
                '<div class="ctn"></div>'+
                '<button class="close-up-btn helper-btn btn-transparent" data-btn="close-up-btn"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>'+
            '</div>';
	}


	
}