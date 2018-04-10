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
            var sql = "set hq.usuario='"+params.user+"';insert into reportes_guardados(id_cuenta, html, nombre, fecha)values("+params.id_cuenta+", '"+params.html+"', '"+params.nombre+"', '"+fecha('#DDD# #D# #MMM# #YY#')+"')";
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
        },
        delReport: function(params){
          var sql = "set hq.usuario='"+params.user+"';delete from reportes_guardados where id = "+params.id;
          var res = params.db.any(sql).catch(e => {
            console.log(e)
          });

          return 'Reporte eliminado exitosamente!';
        }
 





}





/*token:     description:             example:
#YYYY#     4-digit year             1999
#YY#       2-digit year             99
#MMMM#     full month name          February
#MMM#      3-letter month name      Feb
#MM#       2-digit month number     02
#M#        month number             2
#DDDD#     full weekday name        Wednesday
#DDD#      3-letter weekday name    Wed
#DD#       2-digit day number       09
#D#        day number               9
#th#       day ordinal suffix       nd
#hhhh#     2-digit 24-based hour    17
#hhh#      military/24-based hour   17
#hh#       2-digit hour             05
#h#        hour                     5
#mm#       2-digit minute           07
#m#        minute                   7
#ss#       2-digit second           09
#s#        second                   9
#ampm#     "am" or "pm"             pm
#AMPM#     "AM" or "PM"             PM*/

fecha = function(formatString){
  var fecha = new Date();
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=fecha.getFullYear())+"").slice(-2);
  MM = (M=fecha.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][M-1]).substring(0,3);
  DD = (D=fecha.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"][fecha.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=fecha.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=fecha.getMinutes())<10?('0'+m):m;
  ss=(s=fecha.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};