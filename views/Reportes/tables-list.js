module.exports = function(listItems, type){


return renderItems(listItems, type);

};

function renderItems(listItems, type){
	
	switch(type){
            case 'tbls':
                 var html = '';
                for (var i = 0; i < listItems.length; i++) {
                    
                    html = html+'<div class="ctn-col-10"><a class="table-item" href="#" data-btn="'+listItems[i]+'" data-selected="0">'+
             
                        sanitaizeTxt(listItems[i])+'</a><spam class="reports-selected-item-counter"></spam><div class="fields-list-main-ctn">'+
                        '<button data-table="'+listItems[i]+'" class="reports-show-all-tbls-btn" type="button">Seleccionar todo</button>'+
                        '<div class="ctn fields-list-ctn" data-table="'+listItems[i]+'"></div></div></div>';
		
                }
             
              
            break;
            case 'flds':
                
                var html = '';
                for (var i = 0; i < listItems.arr.length; i++) {
                    html = html+'<div class="ctn-col-10"><a class="field-item" href="#" data-table="'+listItems.table+'" data-field="'+listItems.arr[i]+'" data-selected="0">'+sanitaizeTxt(listItems.arr[i])+'</a></div>';
		
                }
              
            break;
            default:
            break;
        }
	
	return html;
}

function sanitaizeTxt(txt){
    var space = txt.replace(/#|_/g,' ');
    var capital = txt[0].toUpperCase();
    return capital+space.substr(1);
}


