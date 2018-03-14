module.exports = {

	getPiviledges: function(params){
        return params.db.one("select b.privilegios from roles a, rol_privilegios_relation b, cuentas c where a.id = b.id_rol and a.id = c.id_rol and a.id = $1 limit 1", params.id_rol);

    },

    //==============================================================================================================================================================    

    login: function(params, req){
     
        switch (params.funcion) {
            case "login":
             var promise = params.db.task(t => {

             return t.oneOrNone("select  "+
                "a.*,  "+
                "b.estado,  "+
                "b.id as id_cuenta, "+
                "b.id_usuario, "+
                "c.id as id_rol, "+
                "c.nombre_rol, "+
                "d.nombre_area "+
                "from accesos a  "+
                "inner join  "+
                "cuentas b "+
                "on a.id_usuario = b.id_usuario "+
                "inner join  "+
                "roles c  "+
                "on b.id_rol = c.id "+
                "inner join "+
                "areas d "+
                "on c.id_area = d.id_area "+
                "where  "+
                "a.nombre_de_usuario = $1 ", params.username)
                .then(d => {
                   
                    if(d){
                        if(d.password == params.password){
                            if(d.estado == 'inactivo'){
                                return {
                                    mess: 'inactivo',
                                    user: d.nombre_de_usuario,
                                    id: d.id
                                };
                            }else{
                                return {
                                    mess: 'success',
                                    user: d.nombre_de_usuario,
                                    id: d.id,
                                    id_usuario: d.id_usuario,
                                    id_rol: d.id_rol,
                                    id_cuenta: d.id_cuenta,
                                    nombre_rol: d.nombre_rol,
                                    nombre_area: d.nombre_area
                                };
                            }
                            
                        }else{
                            return {
                                mess: 'wrong pass',
                                user: d.nombre_de_usuario,
                                id: d.id,
                                pass: params.password
                            };
                        }
                    }else{
                        return {
                            mess: 'wrong user'
                        };
                    }
                });
            }).then(e => {
                 console.log(e);
                switch (e.mess) {
                   
                    case 'success':
                        var ip = req.connection.remoteAddress;
                        var log_access = params.db.any("set hq.usuario = 'robot';insert into log_logins (ip, id_acceso, fecha) values('"+ip+"', '"+e.id+"', now())").catch(err => {console.log(err)});
                        var online = params.db.any("set hq.usuario = 'robot';update cuentas set estado = 'online' where id = $1", e.id_cuenta).catch(e => {console.log(e)});
                        return e;
                    break;
                    case 'wrong pass':

                        var ip = req.connection.remoteAddress;
                        var log_access = params.db.any("set hq.usuario ='robot';insert into log_login_fallidos (ip, id_acceso, fecha) values('"+ip+"', '"+e.id+"', now())").catch(err => {console.log(err)});
                        return e;
                    break;
                   
                    default:
                        return e;
                    break;
                }

            }).catch(err => {
                console.log(err);
            });

            return promise;
             
            break;
            default:
                // statements_def
                break;
        }
        
    },
     signOut: function(params){
        console.log(params);
        var res = params.db.any("set hq.usuario = 'robot';update cuentas set estado = 'offline' where id = $1", params.id_cuenta)
        return 'done';
    }




}