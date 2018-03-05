/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
    
    reportTools: function(){
        return '<form id="reports-tools-form">'+
            '<div class="ctn">'+
             
              
               
                 '<div class="ctn-col-10">'+
                    '<button class="export-to-excel-btn" type="button">Exportar a Excel</button>'+
                 '</div>'+
                 
                 '<div class="ctn-col-10">'+
                    '<a href="#" class="reports-tools-print-btn">Imprimir</a>'+
                 '</div>'+
            '</div>'+
        '</form>';
    },
    
    tblTools: function(tname){
        return '<div class="reports-table-tools-main-ctn">'+
               '<button type="button" class="reports-table-clear-btn" data-table="'+tname+'"><i class="fas fa-eraser"></i></button>'+
                '<button type="button" class="reports-table-remove-btn" data-table="'+tname+'"><i class="fas fa-trash"></i></button>'+
               '</div>';
    }
    
    
}

