
//Export function
module.exports = function(obj){
    return results(obj);
}

//=================================================================================================================================================================
function results(obj){
    console.log(obj);
    if(Object.keys(obj).length > 0 && Object.keys(obj)[0] != 'type'){
        var html = '<div class="zebra user-list-result-ctn">';// <-- ZEBRA CTN
        switch (obj.type) {
            case 'usuarios':
                delete obj.type;
                for(var prop in obj)
                {
                   
                        html = html+'<div class="ctn-col-10 zebra-stripe">'+
                        '<div class="ctn-tbl-row">'+

                            '<div class="ctn-tbl-div width-pix-100">'+
                              '<p class="avatar-user text-capital">'+obj[prop]['nombres'].charAt(0)+'</p>'+
                            '</div>'+

                            '<div class="ctn-tbl-div text-to-the-left width-pix-400">'+
                                '<p class="zero-margin zero-padding">'+
                                    obj[prop]['nombres']+ ' ' +obj[prop]['apellidos']+
                                '</p>'+
                                '<spam class="txt-gray-special">'+obj[prop]['nombre_rol']+' - <i class="u-status" data-id="'+obj[prop]['id']+'"></i>';
                                html = html+'</spam>'+
                            '</div>'+

                            '<div class="ctn-tbl-div width-pix-100">'+
                              '<button data-id="'+obj[prop]['id']+'" class="btn-action" data-btn="abrir"><i class="fas fa-angle-down"></i></button>'+
                            '</div>'+
                        '</div>'+
                        '</div>'+
                            
                        '<div>'+buildTableUsers(obj[prop])+'</div>';
                    
                    
                }
            break;
            default:
                // statements_def
            break;
        }
           
      
        
        html = html+"</div>";
        return html;
        
    }else{

        return '<div class="empty-table-message top-90-px text-center user-list-result-ctn"><p><i class="fa fa-times" aria-hidden="true"></i> No hay resultados</p></div>'
    }
	
}
//=================================================================================================================================================================
function buildTableUsers(obj){

    var html = '<div class="t-result-ctn t-result-ctn-'+obj['id']+' in-the-shadows bg-dull-white">'+
    btnSet(obj['id'], obj['id_acceso'], obj['estado'])+
    '<h4 class="sub-title-basic text-to-the-12p">Informacion Personal</h4>';
    for(var prop in obj)
    {
       
    	if(prop == 'password' || prop == 'email_interno' || prop == 'estado' || prop == 'nombre_de_usuario' || prop == 'id_acceso'){

            if(prop == 'password'){
                
                html = html+'<div class="ctn t-row-mobil"><div class="ctn-col-5 t-heading-mobil text-to-the-8p">'+prop.replace('_', ' ')+'</div>'+  
                '<div class="ctn-col-5 text-to-the-8p">********</div></div>';
               
            }else if(prop == 'email_interno'){

                html = html+'<h4 class="sub-title-basic text-to-the-12p">Accesso</h4>'+
                '<div class="ctn t-row-mobil"><div class="ctn-col-5 t-heading-mobil text-to-the-8p">'+prop.replace('_', ' ')+'</div>'+  
                '<div class="ctn-col-5 text-to-the-8p">'+obj[prop]+'</div></div>'; 

            }else{

                 html = html+'<div class="ctn t-row-mobil"><div class="ctn-col-5 t-heading-mobil text-to-the-8p">'+prop.replace('_', ' ')+'</div>'+  
                '<div class="ctn-col-5 text-to-the-8p">'+obj[prop]+'</div></div>';

            }
              
        }else if(prop == 'comentario'){
                html = html+'<h4 class="sub-title-basic text-to-the-12p">Comentarios</h4>'+
                '<div class="ctn t-row-mobil">'+  
                '<div class="ctn-col-10 text-to-the-8p">'+obj[prop]+'</div></div>'; 
        }else{
             
            html = html+'<div class="ctn t-row-mobil"><div class="ctn-col-5 t-heading-mobil text-to-the-8p">'+prop.replace('_', ' ')+'</div>'+  
            '<div class="ctn-col-5 text-to-the-8p">'+obj[prop]+'</div></div>';
        }
		

    }
        html = html+'</div>';

    return html;
}







//=================================================================================================================================================================

function btnSet(recId, id_acceso, estado){
     var html = '<div class="ctn users-info-table-btns-ctn width-pix-200 zero-padding">'+
        '<div class="ctn-col-25">';
            if(estado == 'inactivo'){
                html = html+'<button title="Bloquear usuario" style="color:#e1001a;" class="btn-basic btn-reduced btn-ctr-form-user" data-btn="unblock" data-id="'+recId+'"><i class="fas fa-lock"></i></button>';
            }else{
                html = html+'<button title="Bloquear usuario" class="btn-basic btn-reduced btn-ctr-form-user" data-btn="block" data-id="'+recId+'"><i class="fas fa-unlock"></i></button>';
            }
            
        html = html+'</div>'+
         '<div class="ctn-col-25">'+
            '<button title="Editar usuario" class="btn-basic btn-reduced btn-ctr-form-user" data-btn="edit" data-id="'+recId+'"><i class="fas fa-edit"></i></button>'+
        '</div>'+
         '<div class="ctn-col-25">'+
            '<button title="Eliminar usuario" class="btn-basic btn-reduced btn-ctr-form-user" data-btn="delete" data-id="'+recId+'"><i class="fas fa-trash"></i></button>'+
        '</div>'+
        '<div class="ctn-col-25">'+
            '<button title="Resgistros Logins" class="btn-basic btn-reduced btn-ctr-form-user" data-btn="logs" data-type="logins" data-id="'+id_acceso+'"><i class="fas fa-plug"></i></button>'+
        '</div>'+
    '</div>';

    return html;
}



















