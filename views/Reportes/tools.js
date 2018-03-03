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
                    '<input name="titulo" placeholder="Titulo.." type="text" class="reports-tools-title-input">'+
                 '</div>'+ 
                 '<div class="ctn-col-10">'+
                    '<textarea name="observaciones" class="reports-tools-coments-textarea" placeholder="Observaciones.."></textarea>'+
                 '</div>'+
                 '<div class="ctn-col-10">'+
                    '<a href="#" class="reports-tools-addTbl-btn">Agregar Tabla</a>'+
                 '</div>'+
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
                '<button type="button" data-status="off" class="reports-table-open-tools-btn" data-table="'+tname+'"><i class="fas fa-cog"></i></button>'+
                '<button type="button" class="reports-table-remove-btn" data-table="'+tname+'"><i class="fas fa-trash"></i></button>'+
                '<div class="reports-table-tools-ctn"><div class="ctn" data-table="'+tname+'">'+
            '<div class="ctn-col-10">'+
                '<input placeholder="Titulo.." type="text" class="reports-table-tools-title-input">'+
            '</div>'+
            '<div class="ctn-col-10">'+
                '<textarea class="reports-table-tools-coments-textarea" placeholder="Comentarios.."></textarea>'+
            '</div>'+
        '</div></div></div>';
    }
    
    
}

