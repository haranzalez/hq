var helpers = require('./helpers.js');


module.exports = {
    
    list: function(tabla, params) {
        switch (params.funcion) {
        //PARAMETROS: data[JSON], tabla[STR], database[OBJ], funcion[STR], record_id[STR]
            case "all":
                var sql = "SELECT * FROM " + tabla;
                break;
//------------------------------------------------------------------------------------------------
            case "byId":
                var sql = "SELECT * FROM " + tabla + " WHERE id='" + params.record_id + "'";
                break;
//------------------------------------------------------------------------------------------------          
            case "byIdBulk":

                 var sql = "select  "+
                    "a.*,  "+
                    "b.email_interno,  "+
                    "b.password,  "+
                    "b.nombre_de_usuario, "+
                    "c.estado, "+
                    "d.nombre_rol, "+
                    "e.comentario "+
                    "from  "+
                    "usuarios a inner join accesos b "+
                    "on b.id_usuario = a.id "+
                    "inner join  "+
                    "cuentas c  "+
                    "on c.id_usuario = a.id "+
                    "inner join "+
                    "roles d "+
                    "on c.id_rol = d.id "+
                    "inner join "+
                    "comentarios e "+
                    "on a.id = e.id_usuario "+
                    "where a.id = '"+params.record_id+"'";
            break;

//------------------------------------------------------------------------------------------------
            case "all_db_tables":
                var sql = "SELECT * FROM information_schema.tables";
                break;
//------------------------------------------------------------------------------------------------
            case "select_users_with_access":
                    var sql = "select  "+
                    "a.*,  "+
                    "b.email_interno,  "+
                    "b.password,  "+
                    "b.nombre_de_usuario, "+
                    "c.estado, "+
                    "d.nombre_rol, "+
                    "e.comentario, "+
                    "b.id as id_acceso "+
                    "from  "+
                    "usuarios a inner join accesos b "+
                    "on b.id_usuario = a.id "+
                    "inner join  "+
                    "cuentas c  "+
                    "on c.id_usuario = a.id "+
                    "inner join "+
                    "roles d "+
                    "on c.id_rol = d.id "+
                    "inner join "+
                    "comentarios e "+
                    "on a.id = e.id_usuario ";
            break;
//------------------------------------------------------------------------------------------------
            case "table_headings":
                var sql = "select column_name from information_schema.columns where table_name='"+tabla+"'";
            break;
//------------------------------------------------------------------------------------------------
            case "table_headings_users":
                var sql = "select column_name from information_schema.columns where "+
                "table_name = 'usuarios' or table_name = 'cuentas' or table_name = 'roles' "+
                "or table_name = 'accesos' or table_name = 'comentarios'";
            break;
//------------------------------------------------------------------------------------------------
            case "filter_users":   
                

                 var sql = "select  "+
                    "a.*,  "+
                    "b.email_interno,  "+
                    "b.password,  "+
                    "b.nombre_de_usuario, "+
                    "c.estado, "+
                    "d.nombre_rol, "+
                    "e.comentario "+
                    "from  "+
                    "usuarios a inner join accesos b "+
                    "on b.id_usuario = a.id "+
                    "inner join  "+
                    "cuentas c  "+
                    "on c.id_usuario = a.id "+
                    "inner join "+
                    "roles d "+
                    "on c.id_rol = d.id "+
                    "inner join "+
                    "comentarios e "+
                    "on a.id = e.id_usuario "+
                    "where c.estado = '"+params.filter+"'";


            break;
//------------------------------------------------------------------------------------------------
            case "search_user":


                 var sql = "select  "+
                    "a.*,  "+
                    "b.email_interno,  "+
                    "b.password,  "+
                    "b.nombre_de_usuario, "+
                    "c.estado, "+
                    "d.nombre_rol, "+
                    "e.comentario "+
                    "from  "+
                    "usuarios a inner join accesos b "+
                    "on b.id_usuario = a.id "+
                    "inner join  "+
                    "cuentas c  "+
                    "on c.id_usuario = a.id "+
                    "inner join "+
                    "roles d "+
                    "on c.id_rol = d.id "+
                    "inner join "+
                    "comentarios e "+
                    "on a.id = e.id_usuario "+
                    "where a.email like '%"+params.keyword+"%' or "+
                    "a.nombres like '%"+params.keyword+"%' or "+
                    "a.apellidos like '%"+params.keyword+"%' or "+
                    "b.email_interno like '%"+params.keyword+"%' or "+
                    "c.estado like '%"+params.keyword+"%' or "+
                    "b.nombre_de_usuario like '%"+params.keyword+"%' or "+
                    "d.nombre_rol like '%"+params.keyword+"%';";

            break;
        }
//------------------------------------------------------------------------------------------------
        return {
            mes: sql,
            dta: params.bd.any(sql),
            tabla: tabla
        };
},

//==============================================================================================================================================================

create: function(tabla, params, username) {
    //PARAMETROS: data[JSON], tabla[STR], database[OBJ], funcion[STR]
    switch (params.funcion) {

        case "new":

            var numElms = 0;

            for (var prop in params.data) {
                numElms++;
            }

            var count = 0;
            var sql = "SET hq.usuario = '"+username+"';INSERT INTO " + tabla + " (";
            for (var prop in params.data) {
                count++;
                if (count < numElms) {
                    sql = sql + prop + ", ";
                } else {
                    sql = sql + prop;
                }
            }

            sql = sql + ") VALUES(";

            count = 0;
            for (var prop in params.data) {
                count++;
                if (count < numElms) {
                    sql = sql + "'" + params.data[prop] + "', ";
                } else {
                    sql = sql + "'" + params.data[prop] + "')";
                }
            }

            try{
                var res = params.bd.any(sql);
                return {
                mes: sql,
                dta: res
                };

            }catch(e){
                return {
                    mes: e
                }
            }

        break;
//------------------------------------------------------------------------------------------------
        case "table":
            //PARAMS: nueva_tabla[JSON]{nombre: STR, fields: JSON}, database[OBJ]
            try {
                var elms = 0;
                var count = 0;
                var fiel = "(";
                for (var par in params.nueva_tabla.fields) {
                    elms++;
                }
                for (var field in params.nueva_tabla.fields) {
                    count++;
                    if (count < elms) {
                        fiel = fiel + field + ' ' + params.nueva_tabla.fields[field] + ',';
                    } else {
                        fiel = fiel + field + ' ' + params.nueva_tabla.fields[field];
                    }

                }
                fiel = fiel + ')';
                var sql = "CREATE TABLE " + params.nueva_tabla.nombre + fiel;

                return {
                    mes: sql,
                    dta: params.bd.any(sql)
                };

            } catch (e) {
                return {
                    err: e
                };
            }
            break;
//------------------------------------------------------------------------------------------------
        case 'create_new_user':
           
            var promise = params.db.task(t => {
            return t.oneOrNone("select * from usuarios where email = $1", params.user.email)
                .then(user => {
                if(!user) {
                     var numElms = 0;
                        for (var prop in params.user) {
                            numElms++;
                        }
                        var count = 0;


                        var sql = "SET hq.usuario = '"+username+"';with "+
                        "first as "+
                        "(insert into usuarios(";
                        for (var prop in params.user) {
                            console.log(prop);
                            count++;
                            if (count < numElms) {
                                sql = sql + prop + ", ";
                            } else {
                                sql = sql + prop;
                            }
                        }
                        count = 0;
                        sql = sql + ") values(";

                        for (var prop in params.user) {
                            count++;
                            if (count < numElms) {
                                sql = sql + "'" + params.user[prop] + "', ";
                            } else {
                                sql = sql + "'" + params.user[prop] + "'";
                            }
                        }

                        sql = sql + ") returning id, email), "+
                        "third as "+
                        "(insert into cuentas(estado, id_usuario, id_rol)values('"+params.estado+"',(select id from first), "+params.id_rol+") returning id), "+
                        "forth as "+
                        "(insert into comentarios(id_usuario, comentario)values((select id from first), '"+params.comentario+"')) "+
                        "insert into accesos(email_interno, password, id_usuario, nombre_de_usuario) "+
                        "values('"+params.email_interno+"','"+params.password+"', (select id from first), '"+params.nombre_de_usuario+"') ";

                        params.db.any(sql).catch(e => {console.log(e)});
                        console.log(sql);
                        var pkg = {
                            mess: 'El usuario '+params.user.nombres+' '+params.user.apellidos+' ah sido creado exitosamente.',
                            type: 'success'
                        }
                        return pkg;
                       
                }
                  
                    var pkg = {
                            mess: 'Ya existe un usuario creado en la base de datos con el email: '+params.user.email,
                            type: 'warning'
                        }
                    return pkg;
                });
            })
        return promise;

        break;

    }

},

//==============================================================================================================================================================

update: function(tabla, params, username) {
    //PARAMETROS: funcion[STR], data[JSON], tabla[STR], database[OBJ]
    switch (params.funcion) {
        case "record":
            try {
                var numElms = 0;

                for (var prop in params.data) {
                    numElms++;
                }

                var count = 0;
                var sql = "SET hq.usuario = '"+username+"';UPDATE " + tabla + " SET ";
                for (var prop in params.data) {
                    count++;
                    if (count < numElms) {
                        sql = sql + prop + "='" + params.data[prop] + "',";
                    } else {
                        sql = sql + prop + "='" + params.data[prop] + "'";
                    }
                }
                sql = sql + " WHERE id='" + params.record_id + "'";

                return {
                    mess: 'Actualizacion exitosa!',
                    dta: params.db.any(sql)
                };

            } catch (e) {
                return {
                    err: e
                };
            }
        break;
//------------------------------------------------------------------------------------------------
        case 'update_user':
           
             var sql = "SET hq.usuario = '"+username+"';with "+
                "first as "+
                "(UPDATE usuarios SET ";
                sql = sql+helpers.renderUpdate(params.data.user);
                sql = sql + " WHERE id='" + params.record_id + "'";
                sql = sql + " returning id),"+
                "second as"+
                "(select * from roles where nombre_rol= '"+params.data.rol.nombre_rol+"'), "+
                "third as"+
                "(update cuentas set estado = '"+params.data.cuenta.estado+"', id_rol = (select id from second) where id_usuario = (select id from first) returning id),"+
                "fourth as"+
                "(update accesos set "+helpers.renderUpdate(params.data.acceso)+" where id_usuario = (select id from first))"+
                "update comentarios set "+helpers.renderUpdate(params.data.coment)+" where id_usuario = (select id from first)";

           
           params.bd.any(sql).catch(e => {return e})

            return {
                mes: 'El usuario '+params.data.user.nombres+' '+params.data.user.apellidos+' se ah actualizado exitosamente.',
                type: 'success'
            };


        break;
//------------------------------------------------------------------------------------------------
 case 'update_user_case_3':

            var l = Object.keys(params.data).length;
           
            if(l > 1){
                var count = 0;
                var sql = "SET hq.usuario = '"+username+"';with ";
                for(var prop in params.data){
                    count++
                    if(count == l - 1){
                        var id = (prop=='usuarios')?'id='+params.record_id:'id_usuario='+params.record_id
                        sql = sql+prop+' as (update '+prop+' set '+helpers.renderUpdate(params.data[prop])+' where '+id+') ';
                    }else if(count == l){
                        var id = (prop=='usuarios')?'id='+params.record_id:'id_usuario='+params.record_id
                        sql = sql+'update '+prop+' set '+helpers.renderUpdate(params.data[prop])+' where '+id+';';
                    }else{
                        var id = (prop=='usuarios')?'id='+params.record_id:'id_usuario='+params.record_id
                        sql = sql+prop+' as (update '+prop+' set '+helpers.renderUpdate(params.data[prop])+' where '+id+'), ';
                    }
                  
                   
                 
                }

            }else if(l == 1){
                var sql = '';
                for(var prop in params.data){
                  var id = (prop=='usuarios')?'id='+params.record_id:'id_usuario='+params.record_id
                  sql = sql+"SET hq.usuario = '"+username+"';update "+prop+' set '+helpers.renderUpdate(params.data[prop])+' where '+id;
                }
                
            }
        
         
           
         
           params.bd.any(sql).catch(e => {return e})

            return {
                mes: 'El usuario '+username+' se ah actualizado exitosamente.',
                type: 'success'
            };


        break;




    }

},

delete: function(tabla, params, username) {
    //PARAMETROS: tabla[STR], record_id[STR], database[OBJ]
    switch (params.funcion) {
        case "record":
            try {
                var sql = "SET hq.usuario = '"+username+"';DELETE FROM " + tabla + " WHERE id='" + params.record_id + "'";
                return {
                    mes: sql,
                    dta: params.bd.any(sql)
                };

            } catch (e) {
                return {
                    err: e
                };
            }
        break;
//------------------------------------------------------------------------------------------------
        case "all":
            try {
                var sql = "TURNCATE TABLE" + tabla
                return {
                    mes: sql,
                    dta: params.bd.any(sql)
                };
            } catch (e) {
                return {
                    err: e
                };
            }
        break;
//------------------------------------------------------------------------------------------------
        case "del_user":
            var sql = 'SET hq.usuario = "'+username+'";with '+
            'first as (delete from usuarios where id = '+params.record_id+' returning id), '+
            'second as (delete from cuentas where id_usuario = (select id from first) returning id),'+
            'third as (delete from accesos where id_usuario = (select id from first))'+
            'delete from comentarios where id_usuario = (select id from first)';
        
             params.bd.any(sql).catch(e => {console.log(e);return {
                mes: e,
                type: 'warning'
            }})

            return {
                mes: 'Usuario borrado exitosamente.',
                type: 'success'
            };
        break;


    }
},

//==============================================================================================================================================================

    customQuery: function(tabla, params) {
        //PARAMETROS: database[OBJ], sql[STR]
        try {
            return {
                mes: sql,
                dta: params.bd.any(params.sql)
            }
        } catch (e) {
            return {
                err: e
            };
        }

    },


//==============================================================================================================================================================

    createRol: function(params, username){
       
        var sql = "SET hq.usuario = '"+username+"';with "+
        "first as "+
        "(select * from areas where id_area = "+params.id_area+"), "+
        "second as "+
        "(insert into roles (nombre_rol, id_area, poderes)values('"+params.nombre_rol+"', (select id_area from first), '{"+params.poderes+"}') returning id) "+
        "insert into rol_privilegios_relation (id_rol, privilegios) values((select id from second), '{"+params.privilegios+"}') ";
        params.db.any(sql);
        return {
            mess: 'Rol '+params.nombre_rol+' se ah creado exitosamente.',
            type: 'success'
        };

    },


    updateRol: function(params, username){
      
        var sql = "SET hq.usuario = '"+username+"';with "+
        "a as "+
        "(update rol_privilegios_relation set privilegios = '{"+params.privilegios+"}' where id_rol = "+params.id_rol+" and privilegios <> '{"+params.privilegios+"}')"+
        " update roles set id_area = "+params.id_area+" where id = "+params.id_rol+" and id_area IS DISTINCT FROM "+params.id_area+"";
        console.log(sql);
         params.db.any(sql).catch(e => {console.log(e);});
        return {
            mess: 'Rol actualizado exitosamente.',
            type: 'success'
        };
    },


    deleteRol: function(params, username){
        var sql = "SET hq.usuario = '"+username+"';with"+
        "a as"+
        "(delete from roles where id = 18 returning id)"+
        "delete from rol_privilegios_relation where id_rol = (select id from a)";
         params.bd.any(sql);
        return {
            mess: 'Rol '+params.nombre_rol+' se ah borrado exitosamente.',
            type: 'success'
        };
    },

    listRol: function(params){
    
       var promise = params.bd.task(t => {
          
            return t.batch([
             t.many("select * from roles inner join rol_privilegios_relation on rol_privilegios_relation.id_rol = roles.id inner join areas on areas.id_area = roles.id_area"),
             t.many("select * from privilegios"),
             t.many("select * from areas")
            ]);
       });

       return promise;


   
    },

    getPiviledges: function(params){
        return params.db.one("select b.privilegios from roles a, rol_privilegios_relation b, cuentas c where a.id = b.id_rol and a.id = c.id_rol and a.id = $1 limit 1", params.id_rol);

    },

    blockUser: function(params, username){
        var res = params.db.any("SET hq.usuario = '"+username+"';update cuentas set estado = 'inactivo' where id_usuario = $1",params.id);
        return{
            mess: 'Usuario bloqueado.',
            res: res
        }
    },
     unblockUser: function(params, username){
        var res = params.db.any("SET hq.usuario = '"+username+"';update cuentas set estado = 'offline' where id_usuario = $1",params.id);
        return{
            mess: 'Usuario desbloqueado.',
            res: res
        }
    },

   


    getLog_LoginsById: function(params){
       
       
        
        var res = params.db.many("select ip, fecha, nombre_de_usuario, password, nombre_rol, nombre_area from log_logins "+
            "inner join accesos on accesos.id = log_logins.id_acceso  "+
            "inner join usuarios on accesos.id_usuario = usuarios.id "+
            "inner join cuentas on cuentas.id_usuario = usuarios.id  "+
            "inner join roles on roles.id = cuentas.id_rol  "+
            "inner join areas on roles.id_area = areas.id_area "+
            "where accesos.id = $1", params.id_acceso).catch(e => {
                if(e.received == 0){
                    return {
                        mess: 'No existen registros para este usuario.'
                    }
                }else{
                    console.log(e);
                }

            })
        

        return res;

    },
    getLog_LoginsFallidos: function(params){
       
        
        var res = params.db.many("select ip, fecha, nombre_de_usuario, password, nombre_rol, nombre_area from log_login_fallidos "+
            "inner join accesos on accesos.id = log_login_fallidos.id_acceso  "+
            "inner join usuarios on accesos.id_usuario = usuarios.id "+
            "inner join cuentas on cuentas.id_usuario = usuarios.id  "+
            "inner join roles on roles.id = cuentas.id_rol  "+
            "inner join areas on roles.id_area = areas.id_area "+
            "where accesos.id = $1", params.id_acceso).catch(e => {
                if(e.received == 0){
                    return {
                        mess: 'No existen registros fallidos para este usuario.'
                    }
                }else{
                    console.log(e);
                }
            })

        return res;

    }












}


