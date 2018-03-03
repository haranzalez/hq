var tools = require('./tools.js');


module.exports = function(user){

return '<div id="module-reports" class="ctn in-the-shadows">'+

'<div class="ctn-col-2">'+
'<div class="ctn reports-table-list-tools-ctn">'+

    '<div class="ctn-col-10">'+
        '<input type="text" placeholder="Rec ID" class="report-rec-id-input">'+
    '</div>'+
    
    
    /*'<div class="ctn-col-10">'+
    
        '<div class="ctn reports-date-range-ctn">'+
            '<div class="ctn-col-5">'+
                '<input placeholder="Fecha inicial" type="text" class="reporte-fecha" data-fecha="inicial">'+
            '</div>'+
            '<div class="ctn-col-5">'+
                '<input placeholder="Fecha final" type="text" class="reporte-fecha" data-fecha="final">'+
            '</div>'+
        '</div>'+

    '</div>'+*/
    
    '<div class="ctn-col-10">'+
        '<select class="report-add-to-table-select" name="add_to">'+
            '<option value="">Agregar a...</option>'+
        '</select>'+   
    '</div>'+
    
     '<div class="ctn-col-10">'+
        '<input type="text" class="reports-search-tables-input" placeholder="Buscar..">'+
    '</div>'+
    
'</div>'+
'<div class="tbl-list-main-ctn"><div class="ctn tbl-list-ctn"></div></div>'+
'</div>'+




'<div class="ctn-col-8 preview-ctn">'+
'<div class="reports-tools-ctn">'+
'<button type="button" class="reports-open-tools-btn" data-estate="off" data-btn="reports-tools"><i class="fas fa-wrench"></i></button>'+
tools.reportTools()+
'</div>'+
//preview sheet to export
'<div class="preview-sheet-copy">'+
'<table style="max-width:30%;font-size:12pt;border-collapse: collapse;background-color:white;">'+
'<tr >'+
    '<td style="border-bottom:1px solid red;" colspan="2" rowspan="5" >'+
    '<img class="report-imge" src="http://localhost:8000/estaticos/img/hqlogoReportes.png">'+//LOGO
    '</td>'+
    '<td valign="middle" class="td-ctn reporte-titulo-principal" style="border-bottom:1px solid red;font-size:23pt;font-weigth:900;" colspan="10" rowspan="5">'+
    'Reporte'+
    '</td>'+
'</tr>'+
'</table>'+

'<table style="max-width:30%;font-size:12pt;border-collapse: collapse;background-color:white;">'+
'<tr>'+
'<td class="td-ctn" colspan="12"></td>'+
'</tr>'+
'<tr>'+
'<td class="td-ctn" colspan="12" rowspan="4">'+sanitizeUsetext(user)+'<br>Fecha: <i>'+fecha()+'</i></td>'+
'</tr>'+

'</table>'+

'<table style="max-width:30%;font-size:12pt;border-collapse:collapse;background-color:white;">'+
'<tr>'+
'<td class="reports-table-section-ctn-copy td-ctn" colspan="12"></td>'+
'</tr>'+
'</table>'+

'</div>'+

//Preview sheet to show
'<div class="preview-sheet">'+
//'<div class="reporte-encabezado reporte-encabezado-bg-2"></div>'+




'<div class="ctn" style="border-bottom: 1px solid red;">'+
 
     '<div class="ctn-col-3">'+
     '<img style="width:150px;" class="report-imge" src="http://localhost:8000/estaticos/img/hqlogo.png">'+//LOGO
    '</div>'+
    
    '<div class="ctn-col-7">'+
     '<h2 class="reporte-titulo-principal">Reporte</h2>'+
    '</div>'+
    
     
'</div>'+

'<div class="ctn">'+
    '<div class="ctn-col-4">'+
        '<div class="ctn">'+
            '<div class="ctn-col-10">'+
                '<p class="reporte-texto"><b>Creado por</b><br>'+sanitizeUsetext(user)+'<br>Fecha: <i>'+fecha()+'</i></p>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>'+

'<div class="ctn">'+
    '<div class="ctn-col-10 reports-table-section-ctn">'+
        
    '</div>'+
'</div>'+

/*'<div class="ctn reports-observasiones-ctn">'+
    '<div class="ctn-col-10">'+
        '<p>Observaciones:</p><p class="reports-observaciones-txt"></p>'+
    '</div>'+
'</div>'+*/


'</div>'+
'</div>'+

'</div>';




}


function fecha(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
}

function sanitizeUsetext(user){
    
    var strSplit = user.split('.');
    var sUser = '';
   strSplit.forEach(function(s){
       var capital = s[0].toUpperCase();
       
       sUser = sUser+capital+s.substr(1)+' ';
   })
 
   return sUser;
    
    
    
}