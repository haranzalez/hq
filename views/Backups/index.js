var Stopwatch = require('timer-stopwatch');

module.exports = {

    mainTemplate: function(files){
     
        
        var html = '<div class="backups-main-ctn"><div class="ctn"><div class="ctn-col-7"><table class="backups-table cell-border order-column hover">'+
        '<thead><tr><td style="width:100px;">Fecha</td><td>Backup</td></tr></thead>'+
        '<tbody>';
        var ids = [];
        for(var prop in files){
            
            if(Object.keys(files[prop])[0] == 'mess'){
                html = html+'<tr><td colspan="2">'+files[prop]['mess']+'</td><td></td></tr>';
            }else{
                var fecha = fechaV3(files[prop]['fecha']);
                html = html+'<tr><td>'+fechaV2(fecha, '#DD#/#MM#/#YY# #hhh#:#mm#:#ss# #ampm#')+'</td><td><a href="/backups/'+files[prop]['archivo']+'" download>'+files[prop]['archivo']+'</a></td></tr>';
            }
            
        }
        if(!files[0]['mess']){
            var ultimo = new Date(Math.max.apply(null, files.map(function(e) {
                return fechaV3(e.fecha);
                
            })));
            ultimo = fechaV2(ultimo,'#DD#/#MM#/#YY# #hhh#:#mm#:#ss# #ampm#')
        }
        if(ultimo == undefined){
            var ultimo = 'NA';
        }
     
        html = html+'</tbody>'+
        '</table></div><div class="ctn-col-3">'+
        '<div class="ctn backups-programmer-ctn">'+
        '<div class="ctn-col-10">'+
        '<p style="font-size: 12px;padding: 0px;margin: 0px;background-color: black;color: white;padding: 10px;"><b>Ultimo BackUp:</b> '+ultimo+'</p>'+
        
        '</div>'+
        '<div class="ctn-col-10">'+

            '<div class="ctn">'+
           
            '<div class="ctn-col-7">'+

            '<select class="backups-select-period" size="5">'+
            '<option value="1">Todos los dias</option>'+
            '<option value="2">Cada 2 dias</option>'+
            '<option value="3">Cada 3 dias</option>'+
            '<option value="4">Cada 4 dias</option>'+
            '<option value="5">Cada 5 dias</option>'+
            '<option value="6">Cada 6 dias</option>'+
            '<option value="7">Cada semana</option>'+
            '<option value="14">Cada 2 semanas</option>'+
            '<option value="21">Cada 3 semanas</option>'+
            '<option value="30">Cada mes</option>'+
            '</select>'+ 
            '</div>'+
            '<div class="ctn-col-3">'+
            '<input type="text" id="backups-programmer">'+
            '</div>'+
            '</div>'+
            
           
            '</div>'+
       
        
        

       
        '<div class="ctn-col-10">'+
        
        '<button type="button" class="backups-program-backup-btn">Programar BackUp</button>'+
        
        
        '</div>'+
        
        '</div>'+

        '</div></div></div>';
     
        return html;


    }



}
function fecha(d){
    var date = new Date(d);
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

var fechaV2 = function(date,formatString){
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

  fechaV3 = function(fecha){
    var d = fecha.split(' ');
    var date = d[0].split('/');
    var time = d[1].split(':');
    var year = date[2];
    return new Date(parseInt(year, 10),parseInt(date[1], 10) - 1,parseInt(date[0], 10),parseInt(time[0], 10),parseInt(time[1], 10),parseInt(time[2], 10));
  }

  timer = function(){
    var timer = new Stopwatch(60000); // A new countdown timer with 60 seconds 
    timer.onTime(function(t){
        console.log(t.ms)
    })
    return timer;
  }

  timer.start();