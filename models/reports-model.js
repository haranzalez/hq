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
        }





}