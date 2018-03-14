module.exports = function(obj){

	 var html = '<div class="zebra user-list-result-ctn">';// <-- ZEBRA CTN

	privilegiosList = obj[1];
               
    delete obj.type;
    for(var prop in obj[0])
    {
     if(obj[0][prop]['id'] === 48){//admin
        continue;
     }else{
          html = html+'<div class="ctn-col-10 zebra-stripe">'+
          '<div class="ctn-tbl-row">'+

            '<div class="ctn-tbl-div width-pix-100">'+
              '<p class="avatar-user text-capital">'+obj[0][prop]['nombre_rol'].charAt(0)+'</p>'+
            '</div>'+

            '<div class="ctn-tbl-div text-to-the-left width-pix-400">'+
                '<p class="zero-margin zero-padding">'+
                    obj[0][prop]['nombre_rol']+
                '</p>'+
            '</div>'+

            '<div class="ctn-tbl-div width-pix-100">'+
              '<button data-id="'+obj[0][prop]['id']+'" class="btn-action" data-btn="abrir"><i class="fas fa-angle-down"></i></button>'+
            '</div>'+
        '</div>'+

        buildTablePrivilegios(obj[0][prop]['id'], obj[0][prop]['privilegios'], obj[0][prop]['nombre_area'], obj[2]);
      
    
         html = html+btnSetRoles(obj[0][prop]['id'])+'</div>'+
                '<input name="id_rol" type="hidden" value="'+obj[0][prop]['id']+'">'+
                '</form>';
         }
  
  
    }

    html = html+"</div>";

    return html;


}

//=================================================================================================================================================================

function buildTablePrivilegios(id, priv, area, areas){
     
     var html = '<form class="update-rol-form"><div class="t-result-ctn t-result-ctn-'+id+' in-the-shadows bg-dull-white">'+
     '<h4 class="sub-title-basic">Area</h4>'+
     buildAreasSelect(areas, area)+
     '<h4 class="sub-title-basic">Modulos</h4>';
     
    for (var i = 0; i < privilegiosList.length; i++) {
          html = html+'<div class="ctn">';

               var che = contains.call(priv, privilegiosList[i]['nombre_privilegio']);
                var checked = (che)?'<input name="privilegios" type="checkbox" value="'+privilegiosList[i]['nombre_privilegio']+'" checked>':'<input name="privilegios" type="checkbox" value="'+privilegiosList[i]['nombre_privilegio']+'" >';
                
              html = html+'<div class="ctn-col-4 text-to-the-8p">'+privilegiosList[i]['nombre_privilegio'].replace('_', ' ')+'</div>'+  
              '<div class="ctn-col-6 text-to-the-8p">'+checked+'</div>'+
          '</div>';  
    }
   
   
    return html; 
}
//=================================================================================================================================================================

function btnSetRoles(recId){
    return '<div class="ctn btn-set-ctn width-pix-200">'+
        '<div class="ctn-col-5 text-to-the-left">'+
            '<button type="button" class="btn-basic btn-reduced btn-ctr-form-rol" data-btn="update-rol" data-id="'+recId+'">Actualizar</button>'+
        '</div>'+
         '<div class="ctn-col-5">'+
            '<button type="button" class="btn-basic btn-reduced btn-ctr-form-rol" data-btn="edit-rol-name" data-id="'+recId+'">Renombrar</button>'+
        '</div>'+
    '</div>';
}

//=================================================================================================================================================================
function buildAreasSelect(areas, area){
    var html = '<select name="id_area" class="select-basic-mobil text-to-the-8p">';
    for (var i = 0; i < areas.length; i++) {
        if(areas[i]['nombre_area'] == area){
            html = html+'<option value="'+areas[i]['id_area']+'" selected>'+areas[i]['nombre_area']+'</option>';
        }else{
            html = html+'<option value="'+areas[i]['id_area']+'">'+areas[i]['nombre_area']+'</option>';
        }
        
    }
    html = html+'</select>';

    return html;

}

//=================================================================================================================================================================
//HELPERS
//FUNCTION TO FIND VALUE IN ARRAY
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};