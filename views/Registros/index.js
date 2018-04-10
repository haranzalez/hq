module.exports = function(pkg){

    return '<div class="registros-table-ctn"><table class="registros-table cell-border order-column hover">'+
    buildTblHeadings(pkg)+
    buildRecordsTbl(pkg)+
    
    
    '</table></div>';
    


}



function buildTblHeadings(pkg){
        
        let html = '<thead><tr>';
        let headings = Object.keys(pkg[0]);
        for(var prop in headings){
            html = html+'<td>'+
        
                headings[prop].replace('_', ' ').replace(headings[prop].charAt(0), headings[prop].charAt(0).toUpperCase());
        
            '</td>';
        }
       

    return html+'</tr></thead>';
}

function buildRecordsTbl(pkg){
   
    let html =  '<tbody>';
        for(var prop in pkg){
            
            html = html+'<tr>';
            for(var prop2 in pkg[prop]){
                if(prop2 == 'fecha'){
                    html = html+'<td>';
                    var date = new Date(pkg[prop][prop2]);
                    html = html+fecha(date)+' '+hora(date);
                }else if(prop2 == 'operacion'){
                   if(pkg[prop][prop2] == 'UPDATE'){
                    html = html+'<td>ACTUALIZAR';
                   }
                   if(pkg[prop][prop2] == 'DELETE'){
                    html = html+'<td>ELIMINAR';
                   }
                   if(pkg[prop][prop2] == 'INSERT'){
                    html = html+'<td>CREAR';
                   }
                }else if(pkg[prop][prop2] == undefined){
                    html = html+'<td>'+
        
                    'NA';
                }else if(prop2 == 'campo' && pkg[prop][prop2] == 'html'){
                    if(pkg[prop]['valor_nuevo'] != 'NA'){
                        html = html+'<td><div class="registros-report-preview-box">'+pkg[prop]['valor_nuevo']+'</div>';
                    }else if(pkg[prop]['valor_anterior'] != 'NA'){
                        html = html+'<td><div class="registros-report-preview-box">'+pkg[prop]['valor_anterior']+'</div>';
                    }
                }else{
                    html = html+'<td>'+
        
                    pkg[prop][prop2];
                }
               
                
            html = html+'</td>';
            }
            html = html+'</tr>'
        }
        html = html+'</tbody>';
   
    return html;


}

function fecha(date){
    var date = new Date();
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

function hora(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }