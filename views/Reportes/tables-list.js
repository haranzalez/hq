module.exports = function(listItems, type){


return renderItems(listItems, type);

};

function renderItems(listItems, type){
	
	switch(type){
            case 'tbls':
                 var html = '';
                 var colArr = [];
                for (var i = 0; i < listItems.length; i++) {
                    var color = genRanColor(colArr[colArr.length - 1]);
                    html = html+'<div class="ctn-col-10"><a class="table-item" href="#" data-setColor="false" data-btn="'+listItems[i]+'" data-selected="0" data-color="'+color+'">'+
                        sanitaizeTxt(listItems[i])+'</a>'+
                        '<spam class="reports-selected-item-counter"></spam><div class="fields-list-main-ctn">'+
                        '<button data-table="'+listItems[i]+'" class="reports-show-all-tbls-btn" type="button">Todo</button>'+
                        '<button class="reports-tools-highlight-btn" data-estate="false" type="button">Resaltar</button>'+
                        '<div class="ctn fields-list-ctn" data-table="'+listItems[i]+'"></div></div></div>';
		            colArr.push(color);
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

function genRanColor(color){


    var CSS_COLOR_NAMES = ['#000', '#E20024', 'silver', '#146496', '#1d9e48', 
          '#edad00', '#fdb813', '#293E7A', '#D41A34', '#A38AD0',
          '#036648', '#E7DA49', '#E8006D', '#400003', '#332C27', 
          '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
          '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC' 
        ];

    var option1 = CSS_COLOR_NAMES[Math.floor(Math.random()*CSS_COLOR_NAMES.length)];
    var option2 = CSS_COLOR_NAMES[Math.floor(Math.random()*CSS_COLOR_NAMES.length)];
    

    return (option1 == color)?option2:option1;
}



