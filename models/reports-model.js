module.exports = {


	getTbls: function(params){
		
                if(params.keyword === "all"){
                    var sql = "SELECT table_name "+
                    "FROM information_schema.tables "+
                    "WHERE table_schema='public' or table_schema='registros' and "+
                    "table_type='BASE TABLE'";
                }else{
                    var sql = "SELECT table_name "+
                    "FROM information_schema.tables "+
                    "WHERE table_schema='public' "+
                    "AND table_type='BASE TABLE' AND table_name like '%"+params.keyword+"%'; ";
                }
		

		return params.db.any(sql);
	},
        
        getFields: function(params){
            
            var sql = "SELECT column_name FROM " +
                        "information_schema.columns " +
                        "WHERE table_name = '"+params.table+"';";
    
            return params.db.any(sql);
            
        },
        
        getFieldsData: function(params){
            var sql = "SELECT "+params.field+" FROM "+params.table;
            return params.db.any(sql);
        },
        
        getFieldsDataById: function(params){
            if (params.id.indexOf(',') > -1) { 
                var ids = params.id.split(',');
                var sql = "SELECT "+params.field+" FROM "+params.table+" WHERE ";
                for(var i = 0; i < ids.length; i++){
                    if (i != ids.length - 1){
                        sql = sql+'id='+ids[i]+' or ';
                    }else{
                        sql = sql+'id='+ids[i];
                    }
                    
                }
            }else{
                var sql = "SELECT "+params.field+" FROM "+params.table+" WHERE id="+params.id;
            }
          
            return params.db.any(sql);
        },
        getFieldsDataAll: function(params){
            var sql = "SELECT * FROM "+params.table;
            return params.db.any(sql);
        },

        saveReport: function(params){
            var sql = "insert into reportes_guardados(id_cuenta, html, nombre)values("+params.id_cuenta+", '"+params.html+"', '"+params.nombre+"')";
            var res = params.db.any(sql).catch(e => {console.log(e)});
            return 'Reporte guardado exitosamente';
        },
        savedReportsList: function(params){
            var sql = "select id, nombre, fecha from reportes_guardados where id_cuenta="+Number(params.id_cuenta);
            var res = params.db.any(sql).catch(e => {console.log(e)});
            return res;
        },
        getReport: function(params){
            var sql = "select html from reportes_guardados where id_cuenta="+Number(params.id_cuenta)+" and id="+params.reportID;
            var res = params.db.any(sql).catch(e => {console.log(e)});
            return res;
        }   
 





}