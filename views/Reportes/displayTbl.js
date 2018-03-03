/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    
    tableCol: function(data, field, table){
       
      let html = '<div class="ctn-vertical reports-table-col-ctn zebra" data-field="'+field+'" data-table="'+table+'">'+
              '<div class="ctn-col-div report-tbl-heading"><b>'+sanitizeHeadings(field)+'</b></div>';
   
      for(var i = 0; i < data.length; i++){
         
          for(var prop in data[i]){
              if(prop === 'fecha'){
                  var arr = fechaHora(data[i][prop]);
                  html = html+'<div class="ctn-col-div zebra-stripe report-tbl-field data-field="'+field+'">'+arr+'</div>';
              }else{
                  html = html+'<div class="ctn-col-div zebra-stripe report-tbl-field" data-field="'+field+'">'+data[i][prop]+'</div>';
              }
            
        }
        
      }
        
      html = html+'</div>';
       return html;
        
    },
    
    tableRow: function(data, table){
        let html = '';
      for(var prop in data){
           html = html+'<div class="ctn-vertical reports-table-col-ctn zebra" data-field="'+prop+'" data-table="'+table+'">'+
              '<div class="ctn-col-div report-tbl-heading"><b>'+sanitizeHeadings(prop)+'</b></div>';
         
   
         
          for(var prop2 in data[prop]){
              if(prop === 'fecha'){
                  var arr = fechaHora(data[prop][prop2]);
                  html = html+'<div class="ctn-col-div zebra-stripe report-tbl-field data-field="'+prop+'">'+arr+'</div>';
              }else{
                  html = html+'<div class="ctn-col-div zebra-stripe report-tbl-field" data-field="'+prop+'">'+data[prop][prop2]+'</div>';
              }
            
        }
         html = html+'</div>';
      }
        
     
       
        
        return html;
    
    
   
    }  
    
}

 function fechaHora(raw){
    
        var fecha = raw.toString().slice(0, -14);
	var hora = fecha.substr(fecha.length - 9);
        return fecha;
    }
    
 function sanitizeHeadings(h){
     var space = h.replace(/#|_/g,' ');
     var capital = h[0].toUpperCase();
    return capital+space.substr(1);
     
 }
    