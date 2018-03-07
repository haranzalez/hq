var btn = require('./btns.js');
module.exports = function(type, obj){
    switch (type) {
        case 'menuMobil':
            return '<div class="white-blur"></div><div id="menu" class="ctn-col-8 menu">'+btn('back-btn-menu', {})+
            '<div class="ctn-vertical user-box">'+
            '<div class="ctn-col-10">'+
            '<div class=""><p class="avatar-menu text-capital">'+obj.user.charAt(0)+'</p></div>'+
            '</div>'+
            '<div class="ctn-col-10 text-center">'+
            '<p class="round-16-pad-pix text-capital user-name">'+obj.user+'<br/><spam class="text-slogan-light-gray">'+obj.nombre_rol+'</spam></p>'+

            '</div>'+
            '<div class="ctn-col-10">'+



                render(obj.obj)+
                '<a href="#" class="menu-link">'+
                        '<div class="ctn">'+
                                '<div class="ctn-col-3">'+
                                        '<i class="icon fas fa-sliders-h" aria-hidden="true"></i>'+
                                '</div>'+
                                '<div class="ctn-col-7">'+
                                        'Configuración'+
                                '</div>'+
                        '</div>'+
                '</a>'+

                '<a href="#" class="menu-link sign-out-btn">'+
                        '<div class="ctn">'+
                                '<div class="ctn-col-3">'+
                                        '<i class="icon fas fa-sign-out-alt" aria-hidden="true"></i>'+
                                '</div>'+
                                '<div class="ctn-col-7">'+
                                        'Salir'+
                                '</div>'+
                        '</div>'+
                '</a>'+



            '</div>'+
            '</div>'+
            '</div>';
        break;

        case 'sub-users':
            return '<div class="ctn">'+
            '<div class="ctn-col-10 sub-menu-ctn-mobil">'+
                    '<ul class="sub-menu-mobil">'+
                        '<li class="relativo"><a href="#" class="text-to-the-8p sub-menu-btn" data-link="todos">Todos</a><spam class="arrow-down"></spam></li>'+
                            '<li class="relativo"><a href="#" class="text-to-the-8p sub-menu-btn" data-link="online">En Linea</a><spam class="arrow-down"></spam></li>'+
                            '<li class="relativo"><a href="#" class="text-to-the-8p sub-menu-btn" data-link="offline">Offline</a><spam class="arrow-down"></spam></li>'+
                            '<li class="relativo"><a href="#" class="text-to-the-8p sub-menu-btn" data-link="inactivo">Bloqueados</a><spam class="arrow-down"></spam></li>'+
                            '</a></li>'+
                    '</ul>'+
            '</div>'+
            '</div>';
            break;
        case 'sub-roles':
            return '<div class="ctn">'+
            '<div class="ctn-col-10 sub-menu-ctn-mobil">'+
            '<ul class="sub-menu-mobil">'+
            '<li><a href="#" class="text-to-the-8p btn-sub-menu" data-btn="listRol">Roles</a></li>'+
           
            '</ul>'+
            '</div>'+
            '</div>';
        break;
        case 'sub-user-logs':
    
            return '<div class="ctn">'+
            '<div class="ctn-col-10 sub-menu-ctn-mobil">'+
            '<ul class="sub-menu-mobil">'+
            '<li><a href="#" class="text-to-the-8p btn-sub-menu" data-id="'+obj.id_acceso+'" data-type="logins" data-btn="logLogins">Entradas</a></li>'+
            '<li><a href="#" class="text-to-the-8p btn-sub-menu" data-id="'+obj.id_acceso+'" data-type="fallidos" data-btn="logFallidos">Fallidos </a></li>'+
            '<li><a href="#" class="text-to-the-8p btn-sub-menu" data-id="'+obj.id_acceso+'" data-type="passords" data-btn="logPasswords">Cambios de password </a></li>'+
            '</ul>'+
            '</div>'+
            '</div>';
        break;


        default:
                // statements_def
                break;
    }
}



function render(obj){
    var html = '';
    for(var prop in obj){
        switch (obj[prop]) {
                case 'Usuarios':


                        html = html+'<a href="#" class="menu-link menu-btn" data-btn="users" data-sub="main-sub-users">'+
                        '<div class="ctn">'+
                                '<div class="ctn-col-3">'+
                                        '<i class="icon fas fa-users" aria-hidden="true"></i>'+
                                '</div>'+
                                '<div class="ctn-col-7">'+
                                        'Usuarios'+
                                '</div>'+
                                '</div>'+
                        '</a>';
                break;
                case 'Reportes':


                        html = html+'<a href="#" class="menu-link menu-btn" data-btn="reports">'+
                        '<div class="ctn">'+
                                '<div class="ctn-col-3">'+
                                        '<i class="icon fas fa-file-alt" aria-hidden="true"></i>'+
                                '</div>'+
                                '<div class="ctn-col-7">'+
                                        'Reportes'+
                                '</div>'+
                                '</div>'+
                        '</a>';



                break;
                case 'Registros':

                        html = html+'<a href="#" class="menu-link menu-btn">'+
                        '<div class="ctn">'+
                                '<div class="ctn-col-3">'+
                                        '<i class="icon fas fa-list-alt" aria-hidden="true"></i>'+
                                '</div>'+
                                '<div class="ctn-col-7">'+
                                        'Registros'+
                                '</div>'+
                                '</div>'+
                        '</a>';


                break;
                case 'Backups':

                        html = html+'<a href="#" class="menu-link menu-btn">'+
                        '<div class="ctn">'+ 
                                '<div class="ctn-col-3">'+
                                        '<i class="icon fas fa-database" aria-hidden="true"></i>'+
                                '</div>'+
                                '<div class="ctn-col-7">'+
                                        'Backups'+
                                '</div>'+
                                '</div>'+
                        '</a>';

                break;
                default:
                        // statements_def
                break;
        }

    }

    return html; 
}