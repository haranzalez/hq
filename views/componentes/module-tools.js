module.exports =function(module){

	switch (module) {
		case 'users':
			return '<ul class="module-tools-list">'+
				
			'</ul>';
		break;
		case 'reports':
			return '<ul class="module-tools-list">'+
				'<li class="tool">'+
					'<button class="export-to-excel-btn" type="button"><i class="fas fa-file-excel"></i></button>'+
				'</li>'+
				'<li class="tool">'+
					'<button class="reports-tools-print-btn" type="button"><i class="fas fa-print"></i></button>'+
				'</li>'+
				'<li class="tool">'+
					'<button class="reports-tools-save-btn" type="button"><i class="far fa-save"></i></button>'+
				'</li>'+
			'</ul>';
		break;
		default:
			// statements_def
		break;
	}


}