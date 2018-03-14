module.exports = {


	users: function(mess, username){

		return '<div class="ctn notification-row" data-user="'+username+'" style="width:100%;border-top: 1px solid #ccc;">'+
			'<button class="notification-close-btn" type="button"><i class="fas fa-times-circle"></i></button>'+
			'<div class="ctn-col-2">'+
				
					'<i class="fas fa-user"></i>'+
			
			'</div>'+
			'<div class="ctn-col-8">'+mess+'<span class="notification-date">'+fecha('#hh#:#mm#:#ss# #AMPM#')+'</span></div>'+
		'</div>';
	},

	dbChanges: function(mess){

		return '<div class="ctn notification-row" style="width:100%;border-top: 1px solid #ccc;">'+
			'<button class="notification-close-btn" type="button"><i class="fas fa-times-circle"></i></button>'+
			'<div class="ctn-col-2">'+
				'<i class="fas fa-info-circle"></i>'+
			'</div>'+
			'<div class="ctn-col-8">'+mess+'<br><span class="notification-date">'+fecha('#hh#:#mm#:#ss# #AMPM#')+'</span></div>'+
		'</div>';

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