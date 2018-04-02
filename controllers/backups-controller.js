/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const fs = require('fs');
var template = require('../views/Backups');
var messBox = require('../views/componentes/message-box');
var cron = require('node-cron');
var notifications = require('./notifications.js');


var bmodel = require('../models/backup-model.js');

module.exports = {
    
    backup: function(db, res){
        console.log(process.cwd())
        var fileName = genFileName(new Date());
        var params = {
            fileName : fileName
        }
        
        res.send(messBox.success(bmodel.backup(params)));
        
        
    },
    getBackups: function(db,res){
        fs.readdir('./backups', (err, files) => {
            var dta = [];
            console.log(files.length);
            if(files.length !== 0){
                files.forEach(file => {
                var f = file.split('-');
                var date = f[1];
                var time = f[2];
               
                var date = date.charAt(0)+date.charAt(1)+'/'+date.charAt(2)+date.charAt(3)+'/20'+date.charAt(4)+date.charAt(5)+' '+
                time.charAt(0)+time.charAt(1)+':'+time.charAt(2)+time.charAt(3)+':'+time.charAt(4)+time.charAt(5);
                dta.push({fecha: date, archivo: file});
                
                });

            }else{
                dta.push({mess: 'Aun no se han creado backups.'})
                
            }
            
            console.log(dta);
            res.send(template.mainTemplate(dta));
          })
      
    },

/* ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * **/
/*field	value
second	0-59
minute	0-59
hour	0-23
day of month	1-31
month	1-12 (or names)
day of week	0-7 (or names, 0 or 7 are sunday)*/
    scheduleBackup: function(params){
      
       var minute,hour,day,period,month,year;
       period = params.data.period;
       minute = (params.data.minute.charAt(0) == 0)?params.data.minute.charAt(1):params.data.minute;
       second = (params.data.second.charAt(0) == 0)?params.data.second.charAt(1):params.data.second;
       hour = (params.data.hour.charAt(0) == 0)?params.data.hour.charAt(1):params.data.hour;
       day = (params.data.day == undefined)?'*':params.data.day;
       month = (params.data.month.charAt(0) == 0)?params.data.month.charAt(1):params.data.month
       year = (params.data.year == undefined)?'*':params.data.year;
       var date = '<b>'+day+'/'+month+'/'+year+'</b> a las <b>'+hour+':'+minute+'</b> horas.';
       
       
      console.log(day+' '+month+' '+year+' '+hour+' '+minute+' '+second);
      
      params.fileName = genFileName(fechaV3(day+'/'+month+'/'+year+'-'+hour+':'+minute+':'+second));
        var c = cron.schedule('0 '+minute+' '+hour+' '+day+'/'+period+' '+month+' *', function(){

            var mess = bmodel.backup(params)
            params.io.in('Admin').emit('noti', notifications.dbChanges(mess))
        });
       
        var sql = "SET timezone = 'America/Bogota';insert into backups_programmer(fecha,archivo)values(NOW(),'"+params.fileName+"')";
        params.db.any(sql).catch(e => {console.log(e)})
       
       
        params.res.send(messBox.success('BackUp programado para el '+date))

       
    }
    
    
}


var genFileName = function(date){
    console.log(date)
    return 'BU-'+fecha('#DD##MM##YY#-#hhh##mm##ss#', date).toString();
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
function fecha(formatString, date){
    var fecha = new Date(date);
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
  
  function fechaV3(fecha){
      console.log(fecha)
    var d = fecha.split('-');
    var date = d[0].split('/');
    var time = d[1].split(':');
    var year = date[2];
    return new Date(parseInt(year, 10),parseInt(date[1], 10) - 1,parseInt(date[0], 10),parseInt(time[0], 10),parseInt(time[1], 10),parseInt(time[2], 10));
  }