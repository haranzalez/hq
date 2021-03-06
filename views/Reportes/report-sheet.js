var tools = require('./tools.js');


module.exports = function(user){
    return '<div class="reports-tools-ctn">'+
    tools.reportTools()+
    '</div>'+
    //preview sheet to export
    '<div class="preview-sheet-copy">'+
        '<table style="max-width:30%;font-size:12pt;border-collapse: collapse;background-color:white;">'+
        '<tr >'+
            '<td style="border-bottom:1px solid red;" colspan="2" rowspan="5" >'+
            '<img class="report-imge" src="/estaticos/img/hqlogoReportes.png">'+//LOGO
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

    '<button type="button" class="reports-tools-addTbl-btn" title="Agregar Tabla"><i class="fas fa-plus"></i></button>'+


    '<div class="ctn" style="border-bottom: 1px solid red;">'+

    '<div class="ctn-col-3">'+
    '<img style="width:150px;" class="report-imge" src="/estaticos/img/hqlogoReportes.png">'+//LOGO
    '</div>'+

    '<div class="ctn-col-7">'+
    '<h2 class="reporte-titulo-principal">Reporte</h2>'+
    '<input name="titulo" placeholder="Titulo.." type="text" class="reports-tools-title-input">'+
    '</div>'+

    
    '</div>'+

    '<div class="ctn">'+
    '<div class="ctn-col-4">'+
        '<div class="ctn">'+
            '<div class="ctn-col-10">'+
                '<p class="reporte-texto"><b>Creado por</b><br>'+sanitizeUsetext(user)+'<br>Fecha: <i>'+fecha()+'</i><br>Hora: <i>'+hora()+'</i></p>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '</div>'+

    '<div class="ctn">'+
    '<div class="ctn-col-10 reports-table-section-ctn">'+
        
    '</div>'+
    '</div>'+


    '</div>';
}


function fecha(){
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!

    var yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var date = dd+'/'+mm+'/'+yyyy;
    return date;
}

function hora() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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