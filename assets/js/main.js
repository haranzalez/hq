
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'+
    '<head><!--[if gte mso 9]>'+
      '<xml>'+
        '<x:ExcelWorkbook>'+
          '<x:ExcelWorksheets>'+
            '<x:ExcelWorksheet>'+
              '<x:Name>{worksheet}</x:Name>'+
              '<x:WorksheetOptions>'+
              '<x:DisplayGridlines/>'+
              '</x:WorksheetOptions>'+
            '</x:ExcelWorksheet>'+
          '</x:ExcelWorksheets>'+
        '</x:ExcelWorkbook>'+
      '</xml><![endif]-->'+
    '</head>'+
    '<body>{table}</body>'+
    '</html>'
, base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return function (table, name) {
        if (!table.nodeType) table = document.querySelector(table);
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        var link = document.createElement("a");
            link.download = name+".xls";
            link.href = uri + base64(format(template, ctx));
            link.click();
    };
})();



 $('.export-to-excel-btn').on('click', function(){
     var elm  = document.querySelectorAll('.preview-sheet .reports-table-pkg');
     var numOfCols = convertToTable(elm);
     var title = $('.reporte-titulo-principal').text();
     $('.preview-sheet-copy').find('.td-ctn').attr('colspan', numOfCols);
     $('.preview-sheet-copy').find('.reporte-titulo-principal').attr('colspan', numOfCols - 2);
  
     tableToExcel('.preview-sheet-copy', title);
     
     

 });

function convertToTable(pkg){
 
   
    var pkgLength = pkg.length;
    var cols = [];
    for(var x = 0; x < pkgLength; x++){
       var tableId = $(pkg[x]).attr('data-table');
       var elm =  $(pkg[x]).find('.reports-table-col-ctn');
       
        var fieldsArr = [];
        var headingsArr = [];
        
        for(var a = 0; a < elm.length; a++){
        var table  = document.createElement('table'),
        tbody = document.createElement('tbody');
        
        table.className = 'tabla';
        
        
        
       
       var arr = [];
  
        var headings = $(elm[a]).find('.report-tbl-heading');
        var fields = $(elm[a]).find('.report-tbl-field');
        
        for(var i = 0; i < fields.length; i++){
            arr.push(fields[i].innerText);
        }
        fieldsArr.push(arr);
        
        for(var i = 0; i < headings.length; i++){
            headingsArr.push(headings[i].innerText);
        }
  
        
    var resFields = fieldsArr.reduce((x, y) => {
        for(let i in y) {
          x[i] ? x[i].push(y[i]) : x[i] = [y[i]];
        }
        return x;
    }, []);
    
    
    for(var i = 0; i < resFields.length; i++){
        var bgCol = 'white';
        if(i % 2 === 0){
            bgCol = '#f6f6f6';
        }
        var trow = document.createElement('tr');
        trow.style.backgroundColor = bgCol;
        trow.style.textAlign = 'left';
        trow.style.fontSize = '12pt';
        for(var j = 0; j < resFields[i].length; j++){
            var td = document.createElement('td');
            td.innerText = resFields[i][j];
            trow.appendChild(td);
        }
        tbody.appendChild(trow);
    }
    
    var trowHeading = document.createElement('tr');
    cols.push(headingsArr.length);
    for(var i = 0; i < headingsArr.length; i++){
        var th = document.createElement('th');
        th.innerText = headingsArr[i];
        trowHeading.appendChild(th);
    }
    
    
    tbody.insertBefore(trowHeading, tbody.firstChild);
    table.appendChild(tbody);
   
    $('.reports-table-section-ctn-copy .reports-table-pkg[data-table="'+tableId+'"]').find('.custom-reports-ctn-row').empty().append(table);
    
    
   }
    
}
    
    return cols.length;
    
}



 var autoLogout = new AutoLogout();
 var users = new Users();



//REPORTS TABLE LISTS RESIZING HEIGHT FUNCTION
$(function(){
  $('.tbl-list-main-ctn').css({ height: $(window).innerHeight() - 200 });
  $(window).resize(function(){
    $('.tbl-list-main-ctn').css({ height: $(window).innerHeight() - 200 });
  });
});


  //PREVENTS TO START AUTOLOGOUT FUNCTION AT LOGIN
  if(window.location.pathname != '/')
  {
   var socket = io();
  
    socket.on('hi', function(d){
      console.log(d);
      $('body').append(d);
    })
    socket.on('user', function(d){

      var html = '<li data-user="'+d+'"><i class="fas fa-circle" style="color:green;font-size:8pt;"></i> '+d+'</li>';
      $('.user-status-table ul').append(html)
    })
     socket.on('offuser', function(d){
   
      $('.user-status-table ul li[data-user="'+d+'"]').remove();
    })
    users.listUsers();
      //autoLogout.construir();
      
  }

var getCookie = function (name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

function hideModules(){
  $('.contener-fixed').find("[id^=module]").addClass('in-the-shadows');
}
//===============================================================================================================================================================
//========================================================================= LOGIN ===============================================================================
//===============================================================================================================================================================
//MAIN FUNCTION FOR LOGIN
function login(form){
  var username = form.find('input[name="user"]').val();
  var valid = form.parsley().validate();
  if(valid){
    var data = form.serialize();
    $.ajax({
      data: data,
      url: '/',
      type: 'post',
      success: function(res){
       
        if(res.mess == 'granted'){
         
         window.location = '/plataforma/'+res.nombre_area+'/'+res.nombre_rol+'/'+res.id_rol+'/'+username;
        }else{
          $('body').append(res);
        }
        
      }
    })
  }
  
}
//===============================================================================================================================================================
//SIGN OUT BTN btn is located in main menu
$('.sign-out-btn').on('click', function(){
  $.ajax({
      url: 'http://localhost:8000/signOut',
      type: 'get',
      success: function(res){
        if(res == 'done'){
          autoLogout.destroy();
          window.location = 'http://localhost:8000/';
        }  
      }
  })
})


//===============================================================================================================================================================
//LOGIN BTN
$('.login-btn-ctr').on('click', function(){
  login($('.login-form'));
})






//===============================================================================================================================================================
//========================================================================= PLUGINS ===============================================================================
//===============================================================================================================================================================

/*HELPERS*/
//FUNCTION TO ALTERNATE METHODS ON EVERY CLICK ex[elm.clicToggle(func1, func2)]
//USED FOR MAIN MENU AND SUB-MENU LINKS
$(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));

//===============================================================================================================================================================
//========================================================================= HELPERS ===============================================================================
//===============================================================================================================================================================
$('body').on('click','.helper-btn', function(e){
  var dta = $(this).attr('data-btn');
  switch(dta){
    case 'back-btn-form':

      $(this).parent().css({
        display: 'none'
      });

      
      $(this).parent().find('form')[0].reset();
      $(this).parent().find('.sel-rol-btn').empty().append('<i class="fa fa-plus" aria-hidden="true"></i><p style="line-height: 11;font-size: 16pt;">Rol</p>');
      $(this).parent().find('form .btn-basic[data-btn="update"]').text('Registrar').attr('data-btn', 'registrar');
      
    break;
    case 'back-btn-menu':
     $('.white-blur').removeClass('reveal');
      $('.menu').removeClass('zero-out-absolute-spaces');
    break;
    case 'back-btn-roles':
      users.getAreasWindow();
    break;
     case 'close-up-btn':
      $(this).parent().removeClass('zero-out-absolute-spaces');
      $('.white-blur').removeClass('reveal index-it-23');
    break;
    
   

  }
  
});

//===============================================================================================================================================================
//========================================================================= MESSAGE BOX ===============================================================================
//===============================================================================================================================================================
//MESSAGE BOX BTNS

$('body').on('click','.mess-box-btn', function(){

  var type = $(this).attr('data-btn');
  switch (type) {
    case 'cancel':
      $(this).parent().parent().parent().remove();
    break;
    case 'ok':
      $(this).parent().parent().parent().remove();
    break;
    case 'confirm-delete':
       var id = $(this).attr('data-id');
    
       $.ajax({
        url: 'http://localhost:8000/users/delete/'+id,
        type: 'get',
        success: function(res){
           $('body').append(res);
           users.listUsers();
        }
      })
      $(this).parent().parent().parent().remove();
    break;
    case 'confirm-ban':
      var id = $(this).attr('data-id');
      $.ajax({
          url: 'http://localhost:8000/users/block/'+id,
          type: 'get',
          success: function(res){

             $('.btn-ctr-form-user[data-btn="block"][data-id="'+id+'"]').attr('data-btn', 'unblock')
             .css({
                'color': '#E1001A'
             }).find('.fa-unlock').removeClass('fa-unlock').addClass('fa-lock');
              
             $('body').append(res);
             
          }
      })
      $(this).parent().parent().parent().remove();
    break;
    case 'confirm-unban':
      var id = $(this).attr('data-id');
      $.ajax({
          url: 'http://localhost:8000/users/unblock/'+id,
          type: 'get',
          success: function(res){

            $('.btn-ctr-form-user[data-btn="unblock"][data-id="'+id+'"]').attr('data-btn', 'block')
             .css({
                'color': 'black'
             }).find('.fa-lock').removeClass('fa-lock').addClass('fa-unlock');

            
             
          }
      })
      $(this).parent().parent().parent().remove();
    break;
    default:
      // statements_def
    break;
  }



  
});





//===============================================================================================================================================================
//========================================================================= USERS ===============================================================================
//===============================================================================================================================================================
//USERS CREATE USER BTN
$('body').on('click', '.create-user-form .btn-basic', function(){
   
    var valid = $('#create-user-form').parsley().validate();
    if(valid){
      var dta = $('#create-user-form').serialize();
      if($(this).attr('data-btn') == 'registrar'){
        $.ajax({
          data: dta,
          url: 'http://localhost:8000/users/create',
          type: 'post',
          success: function(res){
              $('body').append(res);
          }
        })
      }
    }else{
      $('.parsley-errors-list li').prepend('<i class="fa fa-exclamation-triangle dark-red" aria-hidden="true"></i> ');
    }
  
 
})


//===============================================================================================================================================================
//USERS SEARCH ACTIVATED ON KEY UP
$('body').find('.search-quary-box').on('keyup', function(){
  users.hideForms();
  var keyword = $(this).val()
  console.log(keyword);
  $.ajax({
    url: 'http://localhost:8000/users/comp/search/'+keyword,
    type: 'get',
    success: function(res){
      $('.list-result-ctn').empty();
       $('.list-result-ctn').append(res);
    }
  })
})

//===============================================================================================================================================================
//USERS SUBMENU SORTING [online, offline, inactive]
$('body').on('click','.sub-menu-mobil .sub-menu-btn', function(){
  users.hideForms();
  var d = $(this).attr('data-link');
  var dta = {
    estado: d
  }
  $.ajax({
    data: dta,
    url: 'http://localhost:8000/users/comp/filter',
    type: 'get',
    success: function(res){
       $('.list-result-ctn div').remove();
       $('.list-result-ctn').append(res);
    }
  })

})


//===============================================================================================================================================================
//USERS ROLES BTN para seleccionar rol en el formulario de usuarios
$('body').on('click','.sel-rol-btn',function(){
 
  $.ajax({
          url: 'http://localhost:8000/recursos/componentes/w1/none/none',
          type: 'get',
          success: function(res){
             $('body').find('.mobile-window-ctn .ctn').empty().append(res);
             $('.mobile-window-ctn').addClass('zero-out-absolute-spaces');
              $('.white-blur').addClass('reveal index-it-23');
             
          }
      })

});


//===============================================================================================================================================================
//BTNS TO HANDLE USERS REQUESTS
//USERS BOTON. botones con esta clase hacen funciones basicas como editar, crear, borrar y buscar. Envia y recibe informacion asynchronous.
$('body').on('click','.btn-ctr-form-user', function(){
  switch ($(this).attr('data-btn')) {

    case 'edit':
      
      var id = $(this).attr('data-id');
       
      
      
      $.ajax({
        url: 'http://localhost:8000/users/'+id,
        type: 'get',
        success: function(res){
         

          var keys = Object.keys(res);
          for(var prop in res){
            if(prop == 'estado'){
              if(res[prop] == 'offline' || res[prop] == 'online'){
                $('body').find('#create-user-form').find("input[type='radio'][name='"+prop+"'][value='offline']").prop('checked', true);
              }else{
                $('body').find('#create-user-form').find("input[type='radio'][name='"+prop+"'][value='"+res[prop]+"']").prop('checked', true);
              }
              
            }else if(prop == 'comentario'){
               $('body').find('#create-user-form').find("textarea[name='"+prop+"']").val(res[prop]);
            }else if(prop == 'nombre_rol'){
              $('body').find('#create-user-form').find("input[name='"+prop+"']").val(res[prop]);
              $('.sel-rol-btn')
              .empty()
              .append('<p>'+res[prop].charAt(0)+'</p>')
              .append('<p style="line-height: 1.5 !important;font-size:unset;color:initial;">'+res[prop]+'</p>');
            }else{
              $('body').find('#create-user-form').find("input[name='"+prop+"']").val(res[prop]);
            }
            
          }
          $('body').find('#create-user-form').find('.btn-basic[data-btn="registrar"]').text('Actualizar').attr('data-btn', 'update').attr('data-id', id);
          
          $('.users-forms-ctn').show();
           
        }
      })
    
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'update':
      var id = $(this).attr('data-id');
     
        var dta = $('#create-user-form').serialize();
        $.ajax({
          url: 'http://localhost:8000/users/update/'+id,
          data: dta,
          type: 'post',
          success: function(res){
           
             $('body').append(res);
             users.listUsers();
             
          }
        })
    
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'delete':
      var id = $(this).attr('data-id');
      $.ajax({
        url:'http://localhost:8000/recursos/componentes/awb/Este usuario sera eliminado permanentemente. Desea continuar%3F./confirm-delete',
        type: 'get',
        success: function(mesBox){
          $('body').append(mesBox);
          $('body').find('.message-box-ctn').find('.mess-box-btn').attr('data-id', id);
          
        }

      })
     
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'block':
    var id = $(this).attr('data-id');

    $.ajax({
      url:'http://localhost:8000/recursos/componentes/awb/La entrada al sistema sera restringida para este usuario. Desea continuar%3F./confirm-ban',
      type: 'get',
      success: function(mesBox){

        $('body').append(mesBox);
        $('body').find('.message-box-ctn').find('.mess-box-btn').attr('data-id', id);
        
      }

    })
  
break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'unblock':
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
      url:'http://localhost:8000/recursos/componentes/awb/La entrada al sistema sera habilitada para este usuario. Desea continuar%3F./confirm-unban',
      type: 'get',
      success: function(mesBox){
        $('body').append(mesBox);
        $('body').find('.message-box-ctn').find('.mess-box-btn').attr('data-id', id);
      
        
      }

    })
  
break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'logs':
  users.getLogs($(this));
break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'cancel-form-btn-user':
    $('.users-forms-ctn').css({
        display: 'none'
      });
      $('.form-create-user form')[0].reset();
      $('.form-create-user').find('.sel-rol-btn').empty().append('<i class="fa fa-plus" aria-hidden="true"></i><p style="line-height: 11;font-size: 16pt;">Rol</p>');
      $('.form-create-user').find('form .btn-basic[data-btn="update"]').text('Registrar').attr('data-btn', 'registrar');
break;
}
  
})


//========================================================================================================================================================
//BTNS TO HANDLE ROLE REQUESTS
$('body').on('click','.btn-ctr-form-rol', function(){

  switch ($(this).attr('data-btn')) {
    case 'crear-rol':
   
      var valid = $('#create-rol-form').parsley().validate();
      if(valid){
         var data = $('#create-rol-form').serialize();
          $.ajax({
            url: 'http://localhost:8000/roles/crear/',
            data: data,
            type: 'post',
            success: function(res){
              $('body').append(res);
              users.listRols();
               
            }
          })
      }
    
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
 case 'update-rol':

        var data = $(this).parent().parent().parent().parent().serialize();
        users.updateRol(data);
        
     
 break;
      
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'edit-rol-name':
      var id = $(this).attr('data-id');
      $.ajax({
          url: 'http://localhost:8000/recursos/componentes/bf1/none/none',
          type: 'get',
          success: function(res){
            
            $('body').append(res);
            $('body').find('.message-box-ctn').find('.mess-box-btn').attr('data-id', id);

             
          }
      })

      
 break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'update-rol-name':
      var id = $(this).attr('data-id');
      var data = 'nombre_rol='+$('.message-box-ctn').find('.text-box').val()+'&id_rol='+id;

     $.ajax({
          url: 'http://localhost:8000/roles/update/name/',
          data: data,
          type: 'post',
          success: function(res){
             $('body').append(res);
             users.listRols();
             
          }
      })

      
 break;
//------------------------------------------------------------------------------------------------------------------------------------------------
//BOTON PARA SELECCIONAR ROL BASADO EN EL ID DEL AREA ASIGNADO

case 'sel-area-btn':
      var id = $(this).attr('data-id');
      
      $.ajax({
        data: id,
          url: 'http://localhost:8000/recursos/componentes/w2/'+id+'/none',
          type: 'get',
          success: function(res){
             $('body').find('.mobile-window-ctn .back-btn').removeClass('in-the-shadows');
             $('body').find('.mobile-window-ctn .ctn').empty().append(res);
             $('.white-blur').addClass('reveal');
             
          }
      })
      
 break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'sel-rol-btn':
     $('.users-rol-input').val($(this).attr('data-name'));
      $('.sel-rol-btn').empty().append('<p>'+$(this).attr('data-name').charAt(0)+'</p>').append('<p style="line-height: 1.5 !important;font-size:unset;color:initial;">'+$(this).attr('data-name')+'</p>');
      $('.mobile-window-ctn').removeClass('zero-out-absolute-spaces');
      $('.white-blur').removeClass('reveal index-it-23');


      
 break;
//------------------------------------------------------------------------------------------------------------------------------------------------

 case 'cancel-form-btn-rol':
    $('.form-create-rol').css({
        display: 'none'
      });
      $('.form-create-rol form')[0].reset();
      users.listRols();
    break;



}

})

//===============================================================================================================================================================
//FUNCION PARA ABRIR Y CERRAR INFORMACION EXTRA DE USUARIO
$('body').on('click', '.list-result-ctn .btn-action', function(e){
  if(e.target.innerText == 'Abrir'){
    $(this).text('Cerrar');
    var id = $(this).attr('data-id')
    $('.t-result-ctn-'+id).toggle('fast');
  }else if(e.target.innerText == 'Cerrar'){
    $(this).text('Abrir');
    var id = $(this).attr('data-id')
    $('.t-result-ctn-'+id).toggle('fast');
  }
 
})

//===============================================================================================================================================================
//USERS SUB-MENU BAR BTNS [USERS AND ROLS]
$('body').on('click','.btn-sub-menu', function(){
  users.hideForms();
  switch ($(this).attr('data-btn')) {
    case 'createUser':
     $('.users-forms-ctn').css({
        'display': 'block'
     });
    
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'createRol':
     users.createRolForm();
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'listRol':
    users.getMenu({menuId:'sub-menu-roles', type: 'sub-roles', entId: 'none'});
    users.listRols();
     $('.menu').removeClass('zero-out-absolute-spaces');
     $('.white-blur').removeClass('reveal');

    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'listUser':
   
    users.getMenu({menuId:'sub-menu-users', type: 'sub-users', entId: 'none'});
    users.listUsers();
     $('.menu').removeClass('zero-out-absolute-spaces');
     $('.white-blur').removeClass('reveal');
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'logLogins':
      users.getLogs($(this));
     
      
     $('.menu').removeClass('zero-out-absolute-spaces');
     $('.white-blur').removeClass('reveal');
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'logFallidos':
    
     
      users.getLogs($(this));
      
      
     $('.menu').removeClass('zero-out-absolute-spaces');
     $('.white-blur').removeClass('reveal');
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'logPassword':
   
      users.getLogs($(this));

      
     $('.menu').removeClass('zero-out-absolute-spaces');
     $('.white-blur').removeClass('reveal');
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    default:
      // statements_def
      break;
  }

});






//===============================================================================================================================================================
//========================================================================= MAIN MENU ===============================================================================
//===============================================================================================================================================================
//MAIN MENU BTNS

/*$('.menu-link').clickToggle(function(){
  var val = $(this).attr('data-sub');
  $('.'+val).toggle('fast');
},function(){
  var val = $(this).attr('data-sub');
  $('.'+val).toggle('fast');
})*/
$('body').on('click','#module-reports .tbl-list-ctn .table-item', function(){
    console.log('click');
  //grab data-selected attribute value
  var selected = $(this).attr('data-selected');
  //grab table name from data-btn attribute
  var table = $(this).attr('data-btn');
 
 //detect if selected is true and set it back to default
  if(selected === "1"){
    $(this).attr('data-selected', '0');
    
    if($(this).siblings('.reports-selected-item-counter').text() > 0){
       $('.fields-list-ctn[data-table="'+table+'"]').parent().css('max-height', '0px');
    }else{
        $(this).css({
        "background-color": "transparent",
        "color": "black",
        "border-bottom": "none"
        });
        $(this).siblings('.reports-selected-item-counter').css('color', 'red');
        //remove table fields from fields list
        $('.fields-list-ctn[data-table="'+table+'"]').parent().css('max-height', '0px');
    }
    
    
    
    //if selected is false, grab fields from database
  }else if(selected === "0"){
    $(this).attr('data-selected', '1');
    //highligth selected table name
    $(this).css({
        "background-color": "black",
        "color": "white",
        "border-bottom": "1px solid silver"
    });
    $(this).siblings('.reports-selected-item-counter').css('color', 'white');
    
    
    if( $('body').find('.fields-list-ctn[data-table="'+table+'"]').is(':empty') ){
         //ajax call
        $.ajax({

          url: '/reports/'+table,
          type: 'get',
          success: function(res){
              $('body').find('.fields-list-ctn[data-table="'+table+'"]').append(res);
              $('.fields-list-ctn[data-table="'+table+'"]').parent().css('max-height', '250px');
          }

        })
    }else{
        $('.fields-list-ctn[data-table="'+table+'"]').parent().css('max-height', '250px');
    }
   
  }
 
 
});




$('body').on('click','#module-reports .fields-list-ctn .field-item', function(){
  var rtbl = $('.report-add-to-table-select').val();
  var recId = $('.report-rec-id-input').val();
  console.log(recId)
  var tbl = $(this).attr('data-table');
  var fld = $(this).attr('data-field');
     //grab data-selected attribute value to check if field is selected
  var selected = $(this).attr('data-selected');

  //grab table name from data-btn attribute
  var field = $(this).attr('data-field');
  var counter = $('.table-item[data-btn="'+tbl+'"]').siblings('.reports-selected-item-counter').text();
 //detect if selected is true and set it back to default of false
  if(selected === "1"){
    $(this).attr('data-selected', '0');
    $(this).css({
        "color": "black"
    });
    
    if(counter == 1 || counter == 0){
        counter = '';
    }else{
        counter--;
    }

    //remove table fields from fields list
    $('body').find('.preview-sheet div.ctn-vertical[data-field="'+field+'"]').remove();
    //if selected is false, grab fields from database
  }else if(selected === "0"){
    $(this).attr('data-selected', '1');
    //highligth selected table name
    $(this).css({
        "color": "red"
    });
    
    
    if(counter === ''){
        counter = 1;
    }else{
        counter++;
    }
    

    if(recId == ''){
        //ajax call
        $.ajax({
        url: '/reports/'+tbl+'/'+fld,
        type: 'get',
        success: function(res){
          
            $('.reports-table-section-ctn').find('.reports-table-pkg[data-table="'+rtbl+'"] .ctn-row').append(res);

        }

      });
    }else{
        $.ajax({
        url: '/reports/'+tbl+'/'+fld+'/'+recId,
        type: 'get',
        success: function(res){
            $('.reports-table-section-ctn').find('.reports-table-pkg[data-table="'+rtbl+'"] .ctn-row').append(res);

        }

      });
    }

   
  }
  $('.table-item[data-btn="'+tbl+'"]').siblings('.reports-selected-item-counter').text(counter);
  
  
});

$('body').on('click','.reports-show-all-tbls-btn', function(){
    var table = $(this).attr('data-table');
    $.ajax({
        url: '/reports/table/all/'+table,
        type: 'get',
        success: function(res){
            
            var rtbl = $('.report-add-to-table-select').val();
            $('.reports-table-section-ctn').find('.reports-table-pkg[data-table="'+rtbl+'"] .ctn-row').append(res);
         
        }
    });
});
$('body').on('click','.reports-table-remove-btn', function(){
    var table = $(this).attr('data-table');
    $('.report-add-to-table-select').find('option[value="'+table+'"]').remove();
    $('.preview-sheet-copy .reports-table-pkg[data-table="'+table+'"]').remove();
    $(this).parent().parent().remove();
   
})


$('.reports-open-tools-btn').on('click', function(){
    var estate = $(this).attr('data-estate');
    if(estate === "off"){
        $(this).html('<i style="color:red" class="fas fa-times"></i>');
        $(this).attr('data-estate', 'on');
        $('#reports-tools-form').fadeIn('fast');
    }else if(estate === "on"){
        $(this).html('<i class="fas fa-wrench"></i>');
        $(this).attr('data-estate', 'off');
        $('#reports-tools-form').fadeOut('fast');
    }
    
});
$('.reports-tools-title-input').on('keyup', function(){
    var txt = $(this).val();
    
   
        if(txt === ''){
        $('.reporte-titulo-principal').text("Escriba titulo..");
        }else{
            $('.reporte-titulo-principal').text(txt);
        }
        
  
    
})
$('.reports-tools-coments-textarea').on('keyup', function(){
    
    var txt = $(this).val();
    $('.reports-observaciones-txt').text(txt);
    
   
  
    
});

$('.reports-tools-print-btn').on('click', function(){
    window.print();
});



$('body').on('keyup','.reports-table-tools-coments-textarea', function(){
    var id = $(this).parent().parent().parent().parent().parent().attr('data-table');
    var txt = $(this).val();
    $('.reports-table-coments').find('.the-coment[data-table="'+id+'"]').text(txt);
    
});


$('body').on('keyup','.reports-table-tools-title-input', function(){
    var txt = $(this).val();
    
    var id = $(this).parent().parent().parent().parent().parent().attr('data-table');
    $('.reports-table-title[data-table="'+id+'"]').text(txt);
    console.log(id);
    setTimeout(function(){
        //find the value equals to txt and replace it with new value
        $('.report-add-to-table-select').find('option[value="'+id+'"]').val(id).text(txt);
        
        
    }, 700);
    
});

$('.report-add-to-table-select').on('change', function(){
    var value = $(this).val();
    $('.fields-list-ctn .field-item').attr('data-rtbl', value);
})


$('.reports-tools-addTbl-btn').on('click', function(){
    
    var pkgs = $('.reports-table-section-ctn').find('.reports-table-pkg');
    var numOfTbls = pkgs.length;
    if(numOfTbls >= 0){
       numOfTbls++;
        //add select items to report-add-to-table-select usinf title value
        var titleVal = $('.reporte-titulo-principal').text();
        $('.report-add-to-table-select').append('<option value="'+numOfTbls+'">Tabla '+numOfTbls+'</option>');
        
        $.ajax({
           url: '/reportes/herramientas/tblTools/'+numOfTbls,
           type: 'get',
           success: function(res){
               var html = '<div class="reports-table-pkg" data-table="'+numOfTbls+'">'+
                '<h3 class="reports-table-title" data-table="'+numOfTbls+'">Tabla '+numOfTbls+'</h3>'+
                '<div class="ctn-row overflow-auto custom-reports-ctn-row"></div>'+
                '<div class="reports-table-coments"><p><b>Comentarios:</b><br><spam class="the-coment" data-table="'+numOfTbls+'"></spam></p></div>'+
                res+
                '</div>';
                $('.reports-table-section-ctn').append(html);
                $('.reports-table-section-ctn-copy').append(html);
           }
        });
        
        
    }
   
});

$('.reports-search-tables-input').on('keyup', function(key){
    var keyword = $(this).val();
   
    if(keyword == ''){
        $.ajax({
          url: '/reports',
          type: 'get',
          success: function(res){
           $('body').find('.tbl-list-ctn').empty();
           $('body').find('.tbl-list-ctn').append(res);
          }
      })
    }else{
        $.ajax({
          url: '/reports/search/'+keyword,
          type: 'get',
          success: function(res){
           $('body').find('.tbl-list-ctn').empty();
           $('body').find('.tbl-list-ctn').append(res);
          }
      })
    }
     
})



$('body').on('click','.reports-table-open-tools-btn', function(){
   var status = $(this).attr('data-status');
   if(status === "off"){
       $(this).attr('data-status', 'on');
       $(this).siblings().fadeIn('fast');
   }else if(status === "on"){
       $(this).attr('data-status', 'off');
       $(this).siblings().fadeOut('fast');
   }
   
   
});













$('.menu-btn').on('click', function(){
  var d = $(this).attr('data-btn');
  switch (d) {
    case 'reports':
      $.ajax({
          url: '/reports',
          type: 'get',
          success: function(res){
         
           hideModules()
           $('body').find('.tbl-list-ctn').empty();
           $('body').find('.tbl-list-ctn').append(res);
           $('#module-reports').removeClass('in-the-shadows');
           $('.menu').removeClass('zero-out-absolute-spaces');
           $('.white-blur').removeClass('reveal');
          }
      })
    break;
    case 'users':
      hideModules();
      $('#module-users').removeClass('in-the-shadows');
      $('.menu').removeClass('zero-out-absolute-spaces');
      $('.white-blur').removeClass('reveal');
    break;
    default:
      // statements_def
    break;
  }
})
//===============================================================================================================================================================
//SUB-MENU BTNS
$('.sub-menu-btn').clickToggle(function(){
  var dta = $(this).attr('data-link');
  $(this).parent().siblings().find('.arrow-down').css('display', 'none');
  $(this).find('.arrow-down').css('display', 'block');
  
},function(){
  $(this).find('.arrow-down').css('display', 'block');
});
//===============================================================================================================================================================
//HAMBURGER BTN TO OPEN MENU
$('.hamMenuBtn').on('click',function(){
  $('.white-blur').addClass('reveal');
  $('.menu').addClass('zero-out-absolute-spaces');
});
//===============================================================================================================================================================
//THIS FUNCTION HELPS TO CLOSE MENU WHEN CLICKING OUT OF IT
$(document).mouseup(function(e){
  if (!$('.menu').is(e.target) && $('.menu').has(e.target).length === 0) 
  {
      $('.menu').removeClass('zero-out-absolute-spaces');
      $('.white-blur').removeClass('reveal');
  }
});


//===============================================================================================================================================================
//USERS TABLE TABS

$('.users-module-ctn .user-module-nav-btns .btn').on('click', function(){
  //hide forms
  users.hideForms();
  //set btn background color and siblings
  $(this).css({
    'border': 'solid 1px #000',
    'border-bottom': 'none',
    'border-top': '2px solid #E1001A',
    'background': 'black',
    'color': 'white',
    'z-index': '1'
  });
  $(this).siblings().css({
    'border': 'none',
    'background': 'transparent',
    "color": "black",
    'z-index': '0'

  })
  
  //emptying container
  $('.list-result-ctn').empty();

  //Storing data from data attribute in variable
  var data = $(this).attr('data-btn');

  //appending data to ctn according to condition
   switch (data) {
      case 'usuarios':
      users.getMenu({menuId:'sub-menu-users', type: 'sub-users', entId: 'none'});
      users.listUsers();
      break;
      case 'roles':
      users.getMenu({menuId:'sub-menu-roles', type: 'sub-roles', entId: 'none'});
      users.listRols();
      break;
   }

  
})


//
//REPORTS
$('body').find('.tbl-list li a').on('click', function(){

  var data = $(this).attr('data-btn');
  console.log(data);
})




