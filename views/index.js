//DEPENDECIES
var header = require('./componentes/header-mobil')('Usuarios');
var menu = require('./componentes/menues.js');
var login = require('./login.js')();
var usuarios = require('./Usuarios');
var reportes = require('./Reportes');
var registros = require('./Registros');
var onlineUsers = require('./componentes/online-users-notification.js');
var backups = require('./Backups');





//=================================================================================================================================================================
//TEMPLATE
exports.build = function(obj) {
    
    return '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
    '<title>Document</title>' +
    '<script defer src="/estaticos/js/fontawesome-all.min.js"></script>'+
    
    '<link rel="stylesheet" href="/estaticos/css/hq.css">'+
    '<link rel="stylesheet" media="screen and (max-width: 728px)" href="/estaticos/css/mobil.css">'+
    '<link rel="stylesheet" media="screen and (min-width: 728px)" href="/estaticos/css/desktop.css">'+
    '<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>'+


    
    '<link rel="stylesheet" type="text/css" href="/estaticos/css/datatables.min.css"/>'+
    '<link rel="stylesheet" type="text/css" href="/estaticos/css/buttons.dataTables.min.css"/>'+
    '<link rel="stylesheet" type="text/css" href="/estaticos/css/responsive.dataTables.min.css"/>'+
    '<link rel="stylesheet" type="text/css" href="/estaticos/css/rowReorder.dataTables.min.css"/>'+
    '<link rel="stylesheet" type="text/css" href="/estaticos/css/scroller.dataTables.min.css"/>'+
    '<link rel="stylesheet" type="text/css" href="/estaticos/css/jquery.datetimepicker.min.css"/>'+
    
 


    '</head>' +
    '<body>' +'<div class="loading-ctn"><div class="loading-inner-ctn"><div class="loading-img"></div><div class="loading-text">Un momento...</div></div></div>'+

    getTemplate(obj)+
   
    '<script src="/socket.io/socket.io.js"></script>'+
    '<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>'+
    '<script type="text/javascript" src="/estaticos/js/datatables.min.js"></script>'+
    '<script type="text/javascript" src="/estaticos/js/dataTables.buttons.min.js"></script>'+
    '<script type="text/javascript" src="/estaticos/js/dataTables.responsive.min.js"></script>'+
    '<script type="text/javascript" src="/estaticos/js/dataTables.rowReorder.min.js"></script>'+
    '<script type="text/javascript" src="/estaticos/js/dataTables.scroller.min.js"></script>'+
    '<script type="text/javascript" src="/estaticos/js/jquery.datetimepicker.full.min.js"></script>'+
    
    '<script src="/estaticos/js/parsley.js"></script>'+
    '<script src="/estaticos/js/autoLogout.js"></script>'+
    '<script src="/estaticos/js/Users.js"></script>'+
    
    '<script src="/estaticos/js/main.js"></script>'+
    '</body>' +
    '</html>';


};

//=================================================================================================================================================================
//TEMPLATE FUNCTIONS
function getTemplate(obj){
    switch (obj.temp) {
        case 'login':
            return '<div class="ctn">'+login+'</div>';
        break;
        case 'plataforma':

            return menu('menuMobil', {obj: obj.privilegios, nombre_rol: obj.nombre_rol, nombre_area: obj.nombre_area, user: obj.user})+header+
            '<div class="module-tools"><div class="ctn"></div></div>'+
            onlineUsers.getComponent()+

            '<div class="contener-fixed">'+

                ecosis(obj.privilegios, obj.user)+

            '</div>';
          

           
        break;
        default:
            // statements_def
            break;
    }

   
    
   

}

function ecosis(obj, user){
    var html = '';
    for(var prop in obj){

        switch (obj[prop]) {
            case 'Usuarios':
                html = html+usuarios();
            break;
            case 'Reportes':
                html = html+reportes(user);
            break;
            case 'Registros':
                html = html+'<div id="module-registros"></div>';
            break;
             case 'Backups':
                html = html+'<div id="module-backups"></div>';
            break;
        }
    }

    return html;
}





