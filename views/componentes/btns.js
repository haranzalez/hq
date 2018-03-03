module.exports = function(type, data){
	switch (type) {

		case 'back-btn-form':
			return '<button type="button" class="back-btn helper-btn btn-transparent" data-btn="back-btn-form"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>';
		break;
		case 'back-btn-menu':
			return '<button type="button" class="back-btn helper-btn btn-transparent" data-btn="back-btn-menu"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>';
		break;
		case 'close-up-btn':
			return '<button type="button" class="close-up-btn helper-btn btn-transparent" data-btn="close-up-btn"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>';
		break;
		case 'set-action-cancel':
			return '<button type="button" data-btn="'+data.action.data+'" class="'+data.action.class+' btn-ctr-form-rol btn-basic">'+data.action.txt+'</button><button type="button" class="'+data.action.class+' btn-basic" data-btn="'+data.cancel.data+'">'+data.cancel.txt+'</button>';
		break;

		default:
		break;
	}
}