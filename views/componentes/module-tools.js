module.exports =function(module){

	switch (module) {
		case 'users':
			return '<ul class="module-tools-list">'+
				'<li class="tool">'+
					'<button class="module-tool-btn users-prime-ctr-btn" data-btn="users"><i class="fas fa-user"></i></button>'+
				'</li>'+
				'<li class="tool">'+
					'<button class="module-tool-btn users-prime-ctr-btn" data-btn="roles"><i class="fas fa-user-circle"></i></button>'+
				'</li>'+
				'<li class="tool">'+
					'<button class="module-tool-btn users-prime-ctr-btn" data-btn="search"><i class="fas fa-search"></i></button>'+
				'</li>'+
			'</ul>';
		break;
		case 'reports':
			return '<ul class="module-tools-list">'+
				'<li class="tool">'+
					'<button class="export-to-excel-btn module-tool-btn" type="button"><i class="fas fa-file-excel"></i></button>'+
				'</li>'+
				'<li class="tool">'+
					'<button class="reports-tools-print-btn module-tool-btn" type="button"><i class="fas fa-print"></i></button>'+
				'</li>'+
				'<li class="tool">'+
					'<button class="reports-tools-save-btn module-tool-btn" type="button"><i class="far fa-save"></i></button>'+
				'</li>'+
			'</ul>';
		break;
		default:
			// statements_def
		break;
	}


}

