//DEPENDECIES
var header = require('./componentes/header-mobil')('Usuarios');
var menu = require('./componentes/menues.js');
var login = require('./login.js')();
var usuarios = require('./Usuarios');
var reportes = require('./Reportes');





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
    '<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>'+
    
    '<link rel="stylesheet" href="/estaticos/css/hq.css">'+
    '<link rel="stylesheet" media="screen and (max-width: 728px)" href="/estaticos/css/mobil.css">'+
    '<link rel="stylesheet" media="screen and (min-width: 728px)" href="/estaticos/css/desktop.css">'+
    '<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>'+

    '</head>' +
    '<body>' +

    getTemplate(obj)+
   
    '<script src="/socket.io/socket.io.js"></script>'+
    '<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>'+
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

            return menu('menuMobil', {obj: obj.privilegios, nombre_rol: obj.nombre_rol, nombre_area: obj.nombre_area, user: obj.user})+header+'<div class="module-tools"></div>'+


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
                html = html+'<div style="position:absolute; top: 20%;text-align:center;">'+obj[prop]+'</div>';
            break;
             case 'Backups':
                html = html+'<div style="position:absolute; top: 20%;text-align:center;">'+obj[prop]+'</div>';
            break;
        }
    }

    return html;
}





