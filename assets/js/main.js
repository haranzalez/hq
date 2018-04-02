
 var autoLogout = new AutoLogout();
 var users = new Users();
var updateFormCopy = '';
var USER = '';





$(window).resize(function(){

  if($(window).width() > 768){
    users.rsizeDesk()
  }else{
    users.rsizeMobil()
  }

  
});







/*BAKCUPS*/
$('body').on('click','.backups-program-backup-btn', function(){

  
  
  var fecha = $(this).attr('data-fecha');
  fecha = fecha.split('-');

   var day = fecha[0],
    month = fecha[1],
    year = fecha[2].split(' ')[0],
    hour = fecha[2].split(' ')[1].split(':')[0],
    minute = fecha[2].split(' ')[1].split(':')[1],
    second = fecha[2].split(' ')[1].split(':')[2],
    period = $('.backups-select-period').val();

  
  $.ajax({
    url: '/programBackUp/'+second+'/'+minute+'/'+hour+'/'+day+'/'+period+'/'+month+'/'+year,
    type: 'get',
    success: function(d){
      redirect(d)
  
      $('body').append(d);
    }
  })
})




function getBakcups(){
 $('.loading-ctn').show();
  $.ajax({
    url: '/getBackups',
    type: 'get',
    success: function(d){
      redirect(d)
      $('#module-backups').empty().append(d);
      $('#module-backups').find('.backups-table').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No hay registros para mostrar",
            "info": "Pagina _PAGE_ de _PAGES_",
            "infoEmpty": "No registros disponibles.",
            "search": "Buscar:",
            "infoFiltered": "(Mostrando _MAX_ registros)",
            "paginate": {
              "first":      "Primero",
              "last":       "Ultimo",
              "next":       "Siguiente",
              "previous":   "Anterior"
          }
          
        },
        "columnDefs": [
          { "targets": 1 }
        ],
        "pageLength": 25,
        "dom": '<"ctn registros-tools" <"ctn-col-thirds outer" <"middle" <"inner" f>>><"ctn-col-thirds outer" <"middle" <"inner" >>><"ctn-col-thirds outer" <"middle" <"inner" >>>>t',
       
        "buttons": [
          'excel'
        ],
        "scrollY":        "600px",
        "responsive": true,
        "scrollCollapse":       true
    });

    function quarterHours(){
      var quarterHours = ["00", "15", "30", "45"];
      var times = [];
      for(var i = 0; i < 24; i++){
        for(var j = 0; j < 4; j++){
          if(i < 10){
            times.push("0" + i + ":" + quarterHours[j]);
          } else {
            times.push(i + ":" + quarterHours[j]);
          }
        }
      }
      return times;
    }

    jQuery.datetimepicker.setLocale('es');
    $('#backups-programmer').datetimepicker({
      allowTimes:quarterHours(),
      format: 'd-m-Y h:i:s',
      inline: true,
      lang: 'es',
      i18n:{
        es:{
         months:[
          'Enero','Febrero','Marzo','Abril',
          'Mayo','Junio','Julio','Agosto',
          'Septiembre','Octubre','Noviembre','Diciembre',
         ],
         dayOfWeek:[
          "Dom", "Lun", "Mar", "Mier", 
          "Jue", "Vie", "Sab",
         ]
        }
       },
       onChangeDateTime:function(dp,$input){
        $('.backups-program-backup-btn').attr('data-fecha', $input.val())
      }
    }).datetimepicker('show');
    
    $('.loading-ctn').fadeOut();

    }

   

  })
}

$('body').on('click','.backup-now-btn', function(){
  $('.loading-ctn').show();
      $.ajax({
        type: 'get',
        url: '/recursos/componentes/confirm/Es recomendable ejecutar un BackUp en horas de no actividad en el sistema para evitar perdida de informacion. Desea continuar/backups-confirm-backup-btn/none',
        success: function(d){
        redirect(d);
        $('body').append(d);
        $('.loading-ctn').fadeOut();
        }
     });
 });
 

$('body').on('click','.backups-confirm-backup-btn', function(){
  $('.loading-ctn').show();
  $.ajax({
   url: '/backup',
   type:'get',
   success: function(d){
     redirect(d);
     getBakcups();
     $('body').append(d);
     $('.loading-ctn').fadeOut();
     
   }

  })
});
$('body').on('click','.backups-sync-table', function(){
  getBakcups();
})
$('body').on('click','.registros-sync-table', function(){
  getRegistros();
})
 





/*REGISTROS*/


function getRegistros(){
  
  $('.loading-ctn').show();
  $.ajax({
    url: '/registros',
    type: 'get',
    success: function(d){
      
      redirect(d)
      $('#module-registros').empty().append(d);
      $('#module-registros').find('.registros-table').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No hay registros para mostrar",
            "info": "Pagina _PAGE_ de _PAGES_",
            "infoEmpty": "No registros disponibles.",
            "search": "Buscar:",
            "infoFiltered": "(Mostrando _MAX_ registros)",
            "paginate": {
              "first":      "Primero",
              "last":       "Ultimo",
              "next":       "Siguiente",
              "previous":   "Anterior"
          }
          
        },
        "columnDefs": [
          { "targets": 1 }
        ],
        "paging": false,
        "dom": '<"ctn registros-tools" <"ctn-col-thirds outer" <"middle" <"inner" f>>><"ctn-col-thirds outer" <"middle" B<"inner" >>><"ctn-col-thirds outer" <"middle" <"inner" l>>>>t',
       
        "buttons": [
          'excel'
        ],
        "scrollY":        "600px",
        "responsive": true,
        "scrollCollapse": true,
        "order": [[ 3, "desc" ]]
        
    });
    $('.loading-ctn').fadeOut();
    }

  })


}


$('body').on('keyup','.registros-filter-input-box', function(){
  var type = $('.registros-filter-select').val();
  filter(type);
  
})




function filter(type) {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.querySelector(".registros-filter-input-box");
  filter = input.value.toUpperCase();
  table = document.querySelector(".registros-table tbody");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[type];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}






















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



 $('body').on('click','.export-to-excel-btn', function(){
     var elm  = document.querySelectorAll('.preview-sheet .reports-table-pkg');
     var numOfCols = convertToTable(elm);
     var title = $('.reporte-titulo-principal').text();
     $('.preview-sheet-copy').find('.td-ctn').attr('colspan', numOfCols);
     $('.preview-sheet-copy').find('.reporte-titulo-principal').attr('colspan', numOfCols - 2);
  
     tableToExcel('.preview-sheet-copy', title);
 });

  $('body').on('click','.reports-tools-confirm-save-btn', function(){
    $('.loading-ctn').show();
     var html  = document.querySelector('.preview-ctn').innerHTML;

     var html = 'nombre='+$(this).parent().siblings('.text-box').val()+'&html='+html.toString();
     $.ajax({
        type: 'post',
        data: html,
        url: '/reportes/guardar',
        success: function(d){
          socket.emit('report', USER);
        $('.message-box-ctn').remove();
        $('body').append(d);
        getSavedReports();
        $('.loading-ctn').fadeOut();
        }
     });
 });
 $('body').on('click','.reports-tools-save-btn', function(){
  $('.loading-ctn').show();
      $.ajax({
        type: 'get',
        url: '/recursos/componentes/mesBoxTextInput/Guardar reporte/reports-tools-confirm-save-btn/none',
        success: function(d){
          redirect(d)
        $('body').append(d);
        $('.loading-ctn').fadeOut();
        }
     });
 });

$('body').on('click','.reports-saved-del-btn', function(){
  $('.loading-ctn').show();
  var id = $(this).attr('data-reportID');

  $.ajax({
    url: '/recursos/componentes/confirm/Este reporte sera eliminado permanentemente. Desea continuar/reports-saved-confirm-del-btn/'+id,
    type: 'get',
    success: function(d){
      redirect(d)
      $('body').append(d);
      $('.loading-ctn').fadeOut();
    }
  })

})

$('body').on('click','.reports-saved-confirm-del-btn', function(){
  $('.loading-ctn').show();
  var id = $(this).attr('data-btn');
  $.ajax({
    url: '/reportes/guardados/eliminar/'+id,
    type: 'get',
    success: function(d){
      redirect(d)
      $('.message-box-ctn').remove();
      $('body').append(d);
      getSavedReports();
      $('.loading-ctn').fadeOut();
    }
  })
})




function getSavedReports(){
  $('.loading-ctn').show();
  $.ajax({
    type: 'get',
    url: '/reportes/guardados',
    success: function(d){
      redirect(d)
      $('.reports-saved-result-ctn').empty().append(d);
      $('.loading-ctn').fadeOut();
    }
  })


}

$('body').on('click','.reports-saved-open-btn', function(){
  $('.loading-ctn').show();
  var id = $(this).attr('data-reportid');
  $.ajax({
    type: 'get',
    url: '/reportes/guardados/'+id,
    success: function(d){
      redirect(d)
      $('.preview-ctn').empty().append(d);
      var tbls = $('.reports-table-tools-title-input');
      $('.report-add-to-table-select').empty()
      for(var i = 0; i < tbls.length; i++){
        $('.report-add-to-table-select').append('<option value="'+$(tbls[i]).siblings('.reports-table-title').attr('data-table')+'">'+$(tbls[i]).val()+'</option>');
      }
      $('.loading-ctn').fadeOut();
    }
  })
})



 $('body').on('click','.reports-tools-print-btn', function(){
    window.print();
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
    trowHeading.style.borderBottom = '1px solid red';
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

function redirect(b){

  if(b == 'redirect'){
    window.location.replace('/');
    return;
  }
}










function getOnlineUsers(){
    var dta = {
      estado: 'online'
    }
    $.ajax({
      data: dta,
      url: '/users/comp/filter',
      type: 'get',
      success: function(res){
        
     
         $('.user-status-table').empty();
         $('.user-status-table').append(res);
      }
    })
}




function getModuleTools(module){
   $.ajax({
          url: '/recursos/componentes/moduleTools/'+module+'/none/none',
          type: 'get',
          success: function(res){
            redirect(res)
             $('body').find('.module-tools').empty().append(res);
             
             
          }
      })
}
function getSecModuleTools(module){

  $('body').find('.module-sec-tools .ctn').empty()
  
  if(module != ''){
    $.ajax({
      url: '/recursos/componentes/secModuleTools/'+module+'/none/none',
      type: 'get',
      success: function(res){
        redirect(res)
         $('body').find('.module-sec-tools .ctn').append(res);
        
        
         
      }
    })
  }
   
}

//REPORTS TABLE LISTS RESIZING HEIGHT FUNCTION



  //PREVENTS TO START AUTOLOGOUT FUNCTION AT LOGIN
  if(window.location.pathname != '/')
  {
 
      var socket = io();
    
      socket.on('hi', function(d){
        console.log(d);
        $('body').append(d);
      })
      socket.on('username', function(username){
         USER = username;
      })
    

      socket.on('noti', function(d){
        var count = $('.notification-counter').text();
        if(count == ''){
          count = 1
        }else{
          count++;
        }
        $('.notification-counter').text(count).show()
        $('.notification-status-table').append(d)
      })

      socket.on('report', function(d){
        var count = $('.notification-counter').text();
        if(count == ''){
          count = 1
        }else{
          count++;
        }
        $('.notification-counter').text(count).show()
        $('.notification-status-table').append(d)
      })
      
      socket.on('offuser', function(d){
        var count = $('.notification-counter').text();
        if(count == ''){
          count = 1
        }else{
          count++;
        }
        $('.notification-counter').text(count).show()
        $('.notification-status-table').append(d)

      })




       getSavedReports();
     
       autoLogout.construir();
      
  }

  $('body').on('click','.notification-component-btn', function(){
  
    if($(this).siblings('.notification-status-table-main-ctn').css('display') == 'block'){
      $(this).siblings('.notification-status-table-main-ctn').hide();
    }else{
      $(this).siblings('.notification-status-table-main-ctn').show();
    }
    
  })
  $('body').on('click','.notification-row .notification-close-btn', function(){
    var count = $('.notification-counter').text();
    if(!count == '' || !count == 0){
      count--;
    }
    if(count == 0)
    {
      count = '';
      $('.notification-counter').text(count).hide();
    }else{
      $('.notification-counter').text(count);
    }
    
    $(this).parent().remove();
  })



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
      url: '/signOut',
      type: 'get',
      success: function(res){
        if(res == 'done'){
          autoLogout.destroy();
          window.location = '/';
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
    $('.loading-ctn').show();
       var id = $(this).attr('data-id');
    
       $.ajax({
        url: '/users/delete/'+id,
        type: 'get',
        success: function(res){
           redirect(res);
           $('body').append(res);
           users.listUsers();
           $('.loading-ctn').fadeOut();
        }
      })
      $(this).parent().parent().parent().remove();
    break;
    case 'confirm-ban':
    $('.loading-ctn').show();
      var id = $(this).attr('data-id');
      $.ajax({
          url: '/users/block/'+id,
          type: 'get',
          success: function(res){
            redirect(res);
             $('.btn-ctr-form-user[data-btn="block"][data-id="'+id+'"]').attr('data-btn', 'unblock')
             .css({
                'color': '#E1001A'
             }).find('.fa-unlock').removeClass('fa-unlock').addClass('fa-lock');
              
             $('body').append(res);
             $('.loading-ctn').fadeOut();
             
          }
      })
      $(this).parent().parent().parent().remove();
    break;
    case 'confirm-unban':
    $('.loading-ctn').show();
      var id = $(this).attr('data-id');
      $.ajax({
          url: '/users/unblock/'+id,
          type: 'get',
          success: function(res){
            redirect(res)
            $('.btn-ctr-form-user[data-btn="unblock"][data-id="'+id+'"]').attr('data-btn', 'block')
             .css({
                'color': 'black'
             }).find('.fa-lock').removeClass('fa-lock').addClass('fa-unlock');

             $('.loading-ctn').fadeOut();
             
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
$('body').on('click', '.create-user-form .user-reg-btn', function(){
  $('.loading-ctn').show();
    var valid = $('#create-user-form').parsley().validate();
    if(valid){
      var dta = $('#create-user-form').serialize();
      if($(this).attr('data-btn') == 'registrar'){
        $.ajax({
          data: dta,
          url: '/users/create',
          type: 'post',
          success: function(res){
            redirect(res)
              $('body').append(res);
              $('.loading-ctn').fadeOut();
          }
        })
      }
    }else{
      $('.parsley-errors-list li').prepend('<i class="fa fa-exclamation-triangle dark-red" aria-hidden="true"></i> ');
    }
  
 
})


//===============================================================================================================================================================
//USERS SEARCH ACTIVATED ON KEY UP
$('body').on('keyup','.search-quary-box', function(){
  
  var keyword = $(this).val()
  console.log(keyword);
  $.ajax({
    url: '/users/comp/search/'+keyword,
    type: 'get',
    success: function(res){
      redirect(res)
      $('.list-result-ctn').empty();
       $('.list-result-ctn').append(res);
    }
  })
})

//===============================================================================================================================================================
//USERS SUBMENU SORTING [online, offline, inactive]
$('body').on('click','.sub-menu-mobil .sub-menu-btn', function(){
  
  var d = $(this).attr('data-link');
  var dta = {
    estado: d
  }
  $.ajax({
    data: dta,
    url: '/users/comp/filter',
    type: 'get',
    success: function(res){
      redirect(res)
     
       $('.list-result-ctn').empty();
       $('.list-result-ctn').append(res);
    }
  })

})


//===============================================================================================================================================================
//USERS ROLES BTN para seleccionar rol en el formulario de usuarios
$('body').on('click','.sel-rol-btn',function(){
 
  $.ajax({
          url: '/recursos/componentes/w1/none/none/none',
          type: 'get',
          success: function(res){
            redirect(res)
             $('body').find('.mobile-window-ctn .ctn').empty().append(res).parent().show();
             $('body').find('.mobile-window-ctn .back-btn').hide();
             $('.white-blur').show();
             
          }
      })

});

$('body').find('.mobile-window-ctn .close-btn-ctn button').on('click', function(){
  $(this).parent().parent().hide();
})

//===============================================================================================================================================================
//BTNS TO HANDLE USERS REQUESTS
//USERS BOTON. botones con esta clase hacen funciones basicas como editar, crear, borrar y buscar. Envia y recibe informacion asynchronous.
$('body').on('click','.btn-ctr-form-user', function(){

  switch ($(this).attr('data-btn')) {

    case 'edit':
    $('.loading-ctn').show();
      var id = $(this).attr('data-id');
       
      
      
      $.ajax({
        url: '/users/'+id,
        type: 'get',
        success: function(res){
          redirect(res)
          updateFormCopy = res;
          
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
              .append('<p style="line-height: 1.5 !important;font-size:unset;color:initial;">'+res[prop]+'</p>');
              
              $('.users-rol-input').val(res[prop]);
            }else{
              $('body').find('#create-user-form').find("input[name='"+prop+"']").val(res[prop]);
            }
            
          }
          $('body').find('#create-user-form').find('.user-reg-btn[data-btn="registrar"]').text('Actualizar').attr('data-btn', 'update').attr('data-id', id);
          
          $('.white-blur').show();
          $('.users-forms-ctn').show();
          $('.loading-ctn').fadeOut();
           
        }
      })
    
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'update':

    $('.loading-ctn').show();
      var id = $(this).attr('data-id');


      function processForm(form){
        /*
        When updating, form generates all values including unaltered ones from its imput fields. This creates a problem when updating the database 
        since the forms are formed using information from different tables. The idea is to only upadate changed values in the database.
        */

        //1. grab data from form and convert it to JSON
        var formData = JSON.stringify(jQuery(form).serializeArray());
        var newD = JSON.parse(formData);

        //2. sanitize JSON obj by assigning proper keys and values then assign them to new onject PKG
        var pkg = {};
       
        for(var prop in newD){
          pkg[newD[prop]['name']] = newD[prop]['value']
        }

        /*
        3. In this step, a copy of the original values in the from is grab from the variable updateFormCopy, 
        Which was assign by the user when clicking the edit button Ref.(.btn-ctr-form-user[data-btn='edit']).
        The data is copared with the created JSON obj [PKG] using function [deepEqual] returning a boolean value.
        */

        //create new jason to assing non-equal values
        var p = {}
        //if [deepEqual] returns false 
      
        if(!deepEqual(pkg, updateFormCopy)){
        //loop through [PKG] obj and assign non-equal values to new json [P]
          for(var prop in pkg){
            if(Object.values(updateFormCopy).indexOf(pkg[prop]) === -1){
              
              p[prop] = pkg[prop];
            }
          }
          
        }
      
        //4. Convert Json into serialized data to be send via http using [AJAX]
        var str = '';//var is created
        for(var prop in p){
          str = str+prop+'='+p[prop]+'&'; //Ex. name=value&...&

        }
        var serialData = str.slice(0, -1);//trim off las char from str [&] and assign new value to serialData
        updateFormCopy = pkg;//form copy is apdated with new value to prevent data lost
       
        return serialData;

      }

      function deepEqual(x, y) {//Function to compare 2 json obj. return value [BOOL]
        const ok = Object.keys, tx = typeof x, ty = typeof y;
        return x && y && tx === 'object' && tx === ty ? (
          ok(x).length === ok(y).length &&
            ok(x).every(key => deepEqual(x[key], y[key]))
        ) : (x === y);
      }

     
      $.ajax({//AJAX CALL
        url: '/users/update/'+id,
        data: processForm('#create-user-form'),
        type: 'post',
        success: function(res){
          redirect(res)
           socket.emit('noti', USER);
           $('body').append(res);
           users.listUsers();
           $('.loading-ctn').fadeOut();
           
        }
      })
    
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
    case 'delete':
    $('.loading-ctn').show();
      var id = $(this).attr('data-id');
      $.ajax({
        url:'/recursos/componentes/awb/Este usuario sera eliminado permanentemente. Desea continuar%3F./confirm-delete/none',
        type: 'get',
        success: function(mesBox){
          redirect(mesBox)
          socket.emit('noti', USER);
          $('body').append(mesBox);
          $('body').find('.message-box-ctn').find('.mess-box-btn').attr('data-id', id);
          $('.loading-ctn').fadeOut();
        }

      })
     
    break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'block':
$('.loading-ctn').show();
    var id = $(this).attr('data-id');

    $.ajax({
      url:'http://localhost:8000/recursos/componentes/awb/La entrada al sistema sera restringida para este usuario. Desea continuar%3F./confirm-ban/none',
      type: 'get',
      success: function(mesBox){
        redirect(mesBox)
        
        $('body').append(mesBox);
        $('body').find('.message-box-ctn').find('.mess-box-btn').attr('data-id', id);
        $('.loading-ctn').fadeOut();
      }

    })
  
break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'unblock':
$('.loading-ctn').show();
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
      url:'/recursos/componentes/awb/La entrada al sistema sera habilitada para este usuario. Desea continuar%3F./confirm-unban/none',
      type: 'get',
      success: function(mesBox){
        redirect(mesBox)
        $('body').append(mesBox);
        $('body').find('.message-box-ctn').find('.mess-box-btn').attr('data-id', id);
        $('.loading-ctn').fadeOut();
        
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
    $('.loading-ctn').show();
      var valid = $('#create-rol-form').parsley().validate();
      if(valid){
         var data = $('#create-rol-form').serialize();
          $.ajax({
            url: '/roles/crear/',
            data: data,
            type: 'post',
            success: function(res){
              redirect(res)
              $('body').append(res);
              users.listRols();
              $('.loading-ctn').fadeOut();
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
$('.loading-ctn').show();
      var id = $(this).attr('data-id');
      $.ajax({
          url: '/recursos/componentes/bf1/none/none/none',
          type: 'get',
          success: function(res){
            redirect(res)
            $('body').append(res);
            $('body').find('.message-box-ctn').find('.mess-box-btn').attr('data-id', id);
            $('.loading-ctn').fadeOut();
             
          }
      })

      
 break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'update-rol-name':
$('.loading-ctn').show();
      var id = $(this).attr('data-id');
      var data = 'nombre_rol='+$('.message-box-ctn').find('.text-box').val()+'&id_rol='+id;

     $.ajax({
          url: '/roles/update/name/',
          data: data,
          type: 'post',
          success: function(res){
            redirect(res)
             $('body').append(res);
             users.listRols();
             $('.loading-ctn').fadeOut();
          }
      })

      
 break;
//------------------------------------------------------------------------------------------------------------------------------------------------
//BOTON PARA SELECCIONAR ROL BASADO EN EL ID DEL AREA ASIGNADO

case 'sel-area-btn':
$('.loading-ctn').show();
      var id = $(this).attr('data-id');
      
      $.ajax({
        data: id,
          url: '/recursos/componentes/w2/'+id+'/none/none',
          type: 'get',
          success: function(res){
            redirect(res)
             $('body').find('.mobile-window-ctn .back-btn').show();
             $('body').find('.mobile-window-ctn .ctn').empty().append(res);
             $('.loading-ctn').fadeOut();
             
          }
      })
      
 break;
//------------------------------------------------------------------------------------------------------------------------------------------------
case 'sel-rol-btn':
     $('.users-rol-input').val($(this).attr('data-id'));
      $('.sel-rol-btn').empty().append($(this).attr('data-name'));
      $('.mobile-window-ctn').hide();
      
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
  if($(this).attr('data-btn') == 'abrir'){
    $(this).find('svg').css({
      'transform': 'rotate(180deg)',
      'color': 'red'
    })
    $(this).attr('data-btn', 'cerrar');
    var id = $(this).attr('data-id')
    $('.t-result-ctn-'+id).toggle('fast');
  }else if($(this).attr('data-btn') == 'cerrar'){
     $(this).find('svg').css({
      'transform': 'rotate(360deg)',
      'color': 'black'
    })
     $(this).attr('data-btn', 'abrir');
    var id = $(this).attr('data-id')
    $('.t-result-ctn-'+id).toggle('fast');
  }
 
})

//===============================================================================================================================================================
//USERS SUB-MENU BAR BTNS [USERS AND ROLS]
$('body').on('click','.btn-sub-menu', function(){
  //
  switch ($(this).attr('data-btn')) {

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
  var color = '#000';
  var setColor = $(this).attr('data-setColor');
  if(setColor == 'true'){
    color = $(this).attr('data-color');
  }
 
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
       
        //remove table fields from fields list
        $('.fields-list-ctn[data-table="'+table+'"]').parent().css('max-height', '0px');
    }
    
    
    
    //if selected is false, grab fields from database
  }else if(selected === "0"){
    $(this).attr('data-selected', '1');
    //highligth selected table name
    $(this).css({
        "color": 'white',
        "background-color": 'black',
        "border-bottom": "1px solid silver"
    });
 
    
    
    if( $('body').find('.fields-list-ctn[data-table="'+table+'"]').is(':empty') ){
         //ajax call
        $.ajax({

          url: '/reports/'+table,
          type: 'get',
          success: function(res){
              redirect(res)
              $('body').find('.fields-list-ctn[data-table="'+table+'"]').append(res);
              $('.fields-list-ctn[data-table="'+table+'"]').parent().css('max-height', '950px');
          }

        })
    }else{
        $('.fields-list-ctn[data-table="'+table+'"]').parent().css('max-height', '950px');
    }
   
  }
 
 
});




$('body').on('click','#module-reports .fields-list-ctn .field-item', function(){
  var rtbl = $('.report-add-to-table-select').val();

  if(rtbl != ''){
    var recId = $('.report-rec-id-input').val();
 
  var tbl = $(this).attr('data-table');
  var fld = $(this).attr('data-field');
     //grab data-selected attribute value to check if field is selected
  var selected = $(this).attr('data-selected');

  //grab table name from data-btn attribute
  var field = $(this).attr('data-field');
  var counter = $('.table-item[data-btn="'+tbl+'"]').siblings('.reports-selected-item-counter').text();
 //detect if selected is true and set it back to default of false
  
      $(this).attr('data-selected', '1');
      //highligth selected table name
      
    
    
     /*if(counter === ''){
          counter = 1;
      }else{
          counter++;
      }*/
    

      if(recId == ''){
          //ajax call
          $.ajax({
          url: '/reports/'+tbl+'/'+fld,
          type: 'get',
          success: function(res){
             redirect(res)
              $('.reports-table-section-ctn').find('.reports-table-pkg[data-table="'+rtbl+'"] .ctn-row').append(res);
              var color = $('.table-item[data-btn="'+tbl+'"]').attr('data-color');
              $('.reports-table-pkg[data-table="'+rtbl+'"]').find('.reports-table-col-ctn[data-table="'+tbl+'"]').css('border-color', color);
          }

        });
      }else{
          $.ajax({
          url: '/reports/'+tbl+'/'+fld+'/'+recId,
          type: 'get',
          success: function(res){
            redirect(res)
              $('.reports-table-section-ctn').find('.reports-table-pkg[data-table="'+rtbl+'"] .ctn-row').append(res);
               var color = $('.table-item[data-btn="'+tbl+'"]').attr('data-color');
              $('.reports-table-pkg[data-table="'+rtbl+'"]').find('.reports-table-col-ctn[data-table="'+tbl+'"]').css('border-color', color);
          }

        });
      }

  }else{

   var html = '<div class="pop-over"><span class="arrow-up"></span><p>Porfavor seleccione o adicione una tabla en el documento.</p></div>';
   $('.report-add-to-table-select').parent().append(html);
   setTimeout(function(){
      $('.report-add-to-table-select').parent().find('.pop-over').remove();
   },4000)

  }
  
   
  
 
  
  
});

$('body').on('click', '.reports-reset-btn', function(){
  $('.loading-ctn').show();
  $.ajax({
    type: 'get',
    url: '/reportes/sheet',
    success: function(d){
      $('.preview-ctn').empty().append(d);
      $('.loading-ctn').fadeOut();
    }
  })
})

$('body').on('click','.reports-talbe-remove-col-btn', function(){
  $(this).parent().parent().remove();
})
$('body').on('click','.reports-tools-highlight-btn', function(){
  
  var selected = $(this).attr('data-estate');
  var table = $(this).parent().siblings('.table-item').attr('data-btn');
  var color = $(this).parent().siblings('.table-item').attr('data-color');
  if(selected == 'false'){
    $(this).css({
      'color':'white',
      'background-color': color
    })

    
    /*$(this).parent().siblings('.table-item').css({
      'color':'white',
      'background-color': color
     })*/
    $(this).parent().siblings('.table-item').attr('data-setColor', 'true');
    $('.reports-table-col-ctn[data-table="'+table+'"]').css('border', '1px dashed '+color);
    $(this).attr('data-estate', 'true');
    $(this).parent().siblings('.reports-selected-item-counter').show();
    $(this).parent().siblings('.reports-selected-item-counter').css({
      'color':'white',
      'background-color': color
     })
  }else{
    $(this).css({
      'color':'black',
      'background-color': 'initial'
    })
     $(this).parent().siblings('.table-item').attr('data-setColor', 'false');
     /*$(this).parent().siblings('.table-item').css({
      'color':'white',
      'background-color': 'black'
     })*/
     $('.reports-table-col-ctn[data-table="'+table+'"]').css('border', 'none');
    $(this).attr('data-estate', 'false');
    $(this).parent().siblings('.reports-selected-item-counter').hide();
    $(this).parent().siblings('.reports-selected-item-counter').css({
      'color':'white',
      'background-color': 'initial'
     })
  }
})




$('body').on('click','.reports-show-all-tbls-btn', function(){
    var table = $(this).attr('data-table');
     var rtbl = $('.report-add-to-table-select').val();

  if(rtbl != ''){
    $.ajax({
        url: '/reports/table/all/'+table,
        type: 'get',
        success: function(res){
          redirect(res)
            var rtbl = $('.report-add-to-table-select').val();
            $('.reports-table-section-ctn').find('.reports-table-pkg[data-table="'+rtbl+'"] .ctn-row').append(res);
            var elms = $(this).siblings('.custom-reports-ctn-row').find('.reports-table-col-ctn');
    

            for (var i = 0; i < elms.length; i++) {
              var t = $(elms[i]).attr('data-table');
              var field = $(elms[i]).attr('data-field');
              $('.fields-list-ctn[data-table="'+t+'"] .field-item[data-selected="1"][data-field="'+field+'"]').css('color', '#888').attr('data-selected', '0');
              
              
            }


         
        }
    });
  }else{
   var html = '<div class="pop-over"><span class="arrow-left"></span><p>Porfavor seleccione o adicione una tabla en el documento.</p></div>';
   $('.report-add-to-table-select').parent().append(html);
   setTimeout(function(){
      $('.report-add-to-table-select').parent().find('.pop-over').remove();
   },4000)
  }
});


$('body').on('click','.reports-table-remove-btn', function(){
    var table = $(this).attr('data-table');

    var elms = $(this).parent().siblings('.custom-reports-ctn-row').find('.reports-table-col-ctn');
    

    for (var i = 0; i < elms.length; i++) {
      var t = $(elms[i]).attr('data-table');
      var field = $(elms[i]).attr('data-field');
      $('.fields-list-ctn[data-table="'+t+'"] .field-item[data-selected="1"][data-field="'+field+'"]').css('color', '#888').attr('data-selected', '0');
      var counter = Number($('.fields-list-ctn[data-table="'+t+'"]').parent().siblings('.reports-selected-item-counter').text()) - 1;
      $('.fields-list-ctn[data-table="'+t+'"]').parent().siblings('.reports-selected-item-counter').text((counter == 0)?'':counter);
    }

    $('.report-add-to-table-select').find('option[value="'+table+'"]').remove();
    $('.preview-sheet-copy .reports-table-pkg[data-table="'+table+'"]').remove();
    $(this).parent().parent().remove();
   
})
$('body').on('click','.reports-table-clear-btn', function(){
    var table = $(this).attr('data-table');
 
    var elms = $(this).parent().siblings('.custom-reports-ctn-row').find('.reports-table-col-ctn');
    

    for (var i = 0; i < elms.length; i++) {
      var t = $(elms[i]).attr('data-table');
      var field = $(elms[i]).attr('data-field');
      $('.fields-list-ctn[data-table="'+t+'"] .field-item[data-selected="1"][data-field="'+field+'"]').css('color', '#888').attr('data-selected', '0');
      var counter = Number($('.fields-list-ctn[data-table="'+t+'"]').parent().siblings('.reports-selected-item-counter').text()) - 1;
      $('.fields-list-ctn[data-table="'+t+'"]').parent().siblings('.reports-selected-item-counter').text((counter == 0)?'':counter);
    }


   
    
    $('.preview-sheet-copy .reports-table-pkg[data-table="'+table+'"] .custom-reports-ctn-row').empty();
    $(this).parent().siblings('.custom-reports-ctn-row').empty();
   
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
$('body').on('keyup','.reports-tools-title-input', function(){
    var txt = $(this).val();
    
          
        if(txt === ''){
          $('.reporte-titulo-principal').text("Escriba titulo..");
        }else{
            $('.reporte-titulo-principal').text(txt);
            $(this).attr('value', txt)
        }
        
  
    
})
$('body').on('keyup','.reports-tools-coments-textarea', function(){
    
    var txt = $(this).val();
    $('.reports-observaciones-txt').text(txt);
    $(this).attr('value', txt)
    
   
  
    
});





$('body').on('keyup','.reports-table-tools-coments-textarea', function(){
    var id = $(this).parent().parent().attr('data-table');
    var txt = $(this).val();
    $('.reports-table-coments').find('.the-coment[data-table="'+id+'"]').text(txt);
    $(this).attr('value', txt)
    
});


$('body').on('keyup','.reports-table-tools-title-input', function(){
    var txt = $(this).val();
    
    var id = $(this).parent().attr('data-table');
    if(txt == ''){
        txt = 'Tabla '+id;
    }
    $(this).attr('value', txt)
    $('.reports-table-title[data-table="'+id+'"]').text(txt);
 
    setTimeout(function(){
        //find the value equals to txt and replace it with new value
        $('.report-add-to-table-select').find('option[value="'+id+'"]').val(id).text(txt);
        
        
    }, 700);
    
});

$('.report-add-to-table-select').on('change', function(){
    var value = $(this).val();
    $('.fields-list-ctn .field-item').attr('data-rtbl', value);
})


$('body').on('click','.reports-tools-addTbl-btn', function(){
    
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
            redirect(res)
               var html = '<div class="reports-table-pkg" data-table="'+numOfTbls+'">'+
                '<h3 class="reports-table-title" data-table="'+numOfTbls+'">Tabla '+numOfTbls+'</h3>'+
                '<input placeholder="Tabla '+numOfTbls+'" type="text" class="reports-table-tools-title-input">'+
                '<div class="ctn-row overflow-auto custom-reports-ctn-row"></div>'+
                '<div class="reports-table-coments"><p><b>Comentarios:</b><br><spam class="the-coment" data-table="'+numOfTbls+'"></spam></p>'+
                 '<textarea class="reports-table-tools-coments-textarea" placeholder="Comentarios.."></textarea>'+
                '</div>'+
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
            redirect(res)
           $('body').find('.tbl-list-ctn').empty();
           $('body').find('.tbl-list-ctn').append(res);
          }
      })
    }else{
        $.ajax({
          url: '/reports/search/'+keyword,
          type: 'get',
          success: function(res){
            redirect(res)
           $('body').find('.tbl-list-ctn').empty();
           $('body').find('.tbl-list-ctn').append(res);
          }
      })
    }
     
})


$('.menu-btn').on('click', function(){
  var d = $(this).attr('data-btn');
  switch (d) {
    case 'reports':
    users.rsizeDesk()
    $('.loading-ctn').show();
      $.ajax({
          url: '/reports',
          type: 'get',
          success: function(res){
           redirect(res)
           hideModules()
           getModuleTools('reports')
           getSecModuleTools('reports')
           
           $('body').find('.tbl-list-ctn').empty();
           $('body').find('.tbl-list-ctn').append(res);
           $('#module-reports').removeClass('in-the-shadows');
           $('.menu').removeClass('zero-out-absolute-spaces');
           $('.white-blur').removeClass('reveal');
           $('.loading-ctn').fadeOut();
          }
      })
    break;
    case 'users':
      users.createUserForm();
      users.listUsers();
      
      hideModules();
      getModuleTools('users');
      getSecModuleTools('users')
   
      $('#module-users').removeClass('in-the-shadows');
      $('.menu').removeClass('zero-out-absolute-spaces');
      $('.white-blur').removeClass('reveal');
      
    
    break;
    case 'registros':
     users.rsizeDesk()
      hideModules();
      getSecModuleTools('');
      getRegistros();
      getModuleTools('registros');
      
      
      $('#module-registros').removeClass('in-the-shadows');
      $('.menu').removeClass('zero-out-absolute-spaces');
      $('.white-blur').removeClass('reveal');
    break;
    case 'backups':
    users.rsizeDesk()
      hideModules();
      getBakcups();
      getModuleTools('backups');
      getSecModuleTools('')
      
      $('#module-backups').removeClass('in-the-shadows');
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
$(document).mouseup(function(e){
  if (!$('.notification-status-table-main-ctn').is(e.target) && $('.notification-status-table-main-ctn').has(e.target).length === 0) 
  {
      $('.notification-status-table-main-ctn').hide();
     
  }
});




//===============================================================================================================================================================
//USERS TABLE TABS

$('body').on('click','.module-tools-list .tool .users-prime-ctr-btn', function(){
  //hide forms
  
  
 //get dta-btn value

  
  //emptying container
  $('.list-result-ctn').empty();

  //Storing data from data attribute in variable
  var data = $(this).attr('data-btn');

  //appending data to ctn according to condition
   switch (data) {
      case 'users':
        var elm = $('.users-add-btn[data-btn="users"]');
        if(elm.length == 0){

          $('.users-add-btn[data-btn="roles"]').attr('data-btn', 'users');
          

        }
        users.getMenu({menuId:'sub-menu-users', type: 'sub-users', entId: 'none'});
        $('.user-module-tool-bar .title').text('Usuarios')
        users.listUsers();
     

      break;
      case 'roles':
        var elm = $('.users-add-btn[data-btn="roles"]');
        if(elm.length == 0){
          $('.users-add-btn[data-btn="users"]').attr('data-btn', 'roles');
          
        }
        users.getMenu({menuId:'sub-menu-roles', type: 'sub-roles', entId: 'none'});
        $('.user-module-tool-bar .title').text('Roles')
        users.listRols();
      break;
   }

  
})

$('body').on('click','.users-add-btn', function(){
  console.log('click')
  var id = $(this).attr('data-btn');
  if(id == 'users'){
    users.createUserForm();
    $('.white-blur').show();
    $('body').find('.users-forms-ctn').show();
  }else{
    users.createRolForm();
    $('.white-blur').show();
    $('body').find('.users-forms-ctn').show();
  }
  
})

$('body').on('click','.users-close-forms-ctn-btn', function(){
    $('body').find('.users-forms-ctn,.white-blur').hide();
})

//
//REPORTS
$('body').find('.tbl-list li a').on('click', function(){

  var data = $(this).attr('data-btn');
  console.log(data);
})




