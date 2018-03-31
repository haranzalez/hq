module.exports = {


	getTable: (pk) => {
		
		switch (pk.type) {
			case 'underlined_mobil':
				var html = '<div>';
				
				var arr = {
					nombre_de_usuario: pk.obj[0].nombre_de_usuario,
					password: pk.obj[0].password,
					nombre_rol: pk.obj[0].nombre_rol,
					nombre_area: pk.obj[0].nombre_area
				}
				
				html = html+'<div class="t-result-ctn">';
				html = html+'<h4 class="sub-title-basic text-to-the-12p">Usuario</h4>';
				for(var prop in arr){
					 html = html+'<div class="ctn t-row-mobil"><div class="ctn-col-5 t-heading-mobil text-to-the-8p">'+prop+'</div>'+  
			            '<div class="ctn-col-5 text-to-the-8p">'+arr[prop]+'</div></div>';
				}
				html = html+'</div>';
				
				

				html = html+'<table id="users-logs-tale" class="cell-border order-column hover">'+
				'<thead class="">'+
					'<tr>'+
						'<td>Ip</td>'+
						'<td>Fecha</td>'+
						'<td>Hora</td>'+
					'</tr>'+
				'</thead>'+

				'<tbody>';
				
				pk.obj.forEach((e) => {
					
					
					var fecha = e.fecha.toString().slice(0, -14);

					var hora = fecha.substr(fecha.length - 9);


					delete e.fecha
					delete e.nombre_de_usuario;
					delete e.password;
					delete e.nombre_rol;
					delete e.nombre_area;


					e.fecha = fecha.slice(0, -9).substring(4);
					e.hora = convertToStandardTime(hora);
					html = html+'<tr>';
					for(var prop in e)
				    {
			            html = html+'<td>'+e[prop]+'</td>';
					}
					html = html+'</tr>';
				})

				html = html+'</tbody>';
			   
		        

		    	return html+'</table>';
			break;
			
			default:
				// statements_def
			break;
		}
		

    }
		

}




function convertToStandardTime(time){

	time = time.split(':'); // convert to array

	// fetch
	var hours = Number(time[0]);
	var minutes = Number(time[1]);
	var seconds = Number(time[2]);

	// calculate
	var timeValue;

	if (hours > 0 && hours <= 12)
	{
	  timeValue= "" + hours;
	} else if (hours > 12)
	{
	  timeValue= "" + (hours - 12);
	}
	else if (hours == 0)
	{
	  timeValue= "12";
	}
	 
	timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
	timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
	timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

	return timeValue;
}




