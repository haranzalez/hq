

class Users{


  listUsers() {
    $('.loading-ctn').show();
    var cls = this;
    $.ajax({
      url: '/users/comp/lista/usuarios',
      type: 'get',
      success: function(res){
        
        cls.redir(res)
        $('.list-result-ctn div').remove();
        $('body').find('.list-result-ctn').append(res);
        $('.loading-ctn').fadeOut();
        cls.rsizeMobil();
      }
    })
  }

  listRols(){
    $('.loading-ctn').show();
    var cls = this;
    $.ajax({
      url: '/users/comp/lista/roles',
      type: 'get',
      success: function(res){

        cls.redir(res)
        $('.list-result-ctn div').remove();
        $('body').find('.list-result-ctn').append(res);
        $('.loading-ctn').fadeOut();
      }
    })
  }

  createUserForm(){
    $('.loading-ctn').show();
    var cls = this;
      $.ajax({
        url: '/users/comp/createForm',
        type: 'get',
        success: function(res){
          cls.redir(res)
          $('body').find('.users-forms-ctn').empty().append(res);
          $('.loading-ctn').fadeOut();
        }
      })
    
    
  }

  createRolForm(){
    $('.loading-ctn').show();
    var cls = this;
    $.ajax({
      url: '/recursos/componentes/f2/none/none/none',
      type: 'get',
      success: function(res){
       
        cls.redir(res)
        $('body').find('.users-forms-ctn').empty().append(res);
        $('.loading-ctn').fadeOut();
      }
    })
  }

  getAreasWindow(){
    $('.loading-ctn').show();
    var cls = this;
    $.ajax({
      url: '/recursos/componentes/w1/none/none/none',
      type: 'get',
      success: function(res){
        cls.redir(res)
        $('body').find('.mobile-window-ctn .back-btn').hide();
        $('body').find('.mobile-window-ctn .ctn').empty().append(res);
        $('.loading-ctn').fadeOUt();
      }
    })
  }

  updateRol(data){
    $('.loading-ctn').show();
    var cls = this;
    $.ajax({
      data: data,
      url: '/roles/update/',
      type: 'post',
      success: function(res){
        cls.redir(res)
        $('body').append(res);
        $('.loading-ctn').fadeOut();
      }
    })
  }

  getMenu(pkg){
    $('.loading-ctn').show();
    var cls = this;
     $.ajax({
      url: '/recursos/componentes/'+pkg.menuId+'/'+pkg.type+'/'+pkg.entId+'/none',
      type: 'get',
      success: function(res){
     
        cls.redir(res)
        $('body').find('.users-filter-nav').empty().append(res);
        $('.loading-ctn').fadeOut();
        
      }
    })
  }

  getLogs(elm){
    $('.search-quary-box').hide();    
    $('.loading-ctn').show();
    var cls = this;
    var id = elm.attr('data-id');
    var type = elm.attr('data-type');
    $.ajax({
        url: '/users/logs/'+type+'/'+id,
        type: 'get',
        success: function(res){
          cls.redir(res)
          if(res.mess){

            $('body').append(res.mess);
          }else{
            $('.list-result-ctn').empty().append(res);
         
            cls.getMenu({menuId:'sub-user-logs', type: type, entId: id});
            $('#users-logs-tale').DataTable({
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
            "dom": '<"ctn registros-tools" <"ctn-col-thirds outer" <"middle" <"inner" f>>><"ctn-col-thirds outer" <"middle" <"inner" >>><"ctn-col-thirds outer" <"middle" <"inner" l>>>>t',
           
          
            "scrollY":        "400px",
            "responsive": true,
            "scrollCollapse": true
            
            })
            
            $('.user-module-tool-bar').find('.back-btn').find('svg').removeClass().addClass('fas fa-arrow-left');
          }
         
          $('.loading-ctn').fadeOut();
        }
    });
  }

  redir(b){
   
    if(b == 'redirect'){
 
      window.location.replace('/');
      return;
    }
  }

  hideForms(){
   
    
    if($('.users-forms-ctn').find('form').length > 1)
    {
        $('.users-forms-ctn').find('#create-rol-form')[0].reset();
    }
    $('.users-forms-ctn').find('#create-user-form')[0].reset();
    $('#create-user-form').find('.btn-ctr-form-user[data-btn="update"]').attr({'data-btn': 'registrar', 'data-id': ''}).text('Registrar');
    $('.sel-rol-btn').empty().append('<i class="fas fa-plus"></i><p style="line-height: 11;font-size: 16pt;">Rol</p>');
    $('.users-forms-ctn').css({
      'display': 'none'
    })
  }

  rsizeDesk(){
    var addUserBtn = $('body').find('.module-tools-list li:nth-child(3)').html();
    var reloadBtn = $('body').find('.module-tools-list li:nth-child(4)').html();
    $('.user-module-tool-bar').find('.ctn-col-9').append(reloadBtn);
    $('.user-module-tool-bar').find('.ctn-col-1').append(addUserBtn);
    $('.module-tools-list').find('li:nth-child(3)').remove();
    $('.module-tools-list').find('li:nth-child(3)').remove();
    $('body').find('.module-tools-list .tool').css('width', '100%');
  }
  
  rsizeMobil(){
    if($(window).width() <= 768){
      if(!this.isEmpty($('.user-module-tool-bar .ctn-col-1')) || !this.isEmpty($('.user-module-tool-bar .ctn-col-9'))){
        var addUserBtn = $('.user-module-tool-bar').find('.ctn-col-1').html();
        var reloadBtn = $('.user-module-tool-bar').find('.ctn-col-9').html();
        if($('.module-tools-list li').length > 2){
          $('.module-tools-list').find('li:nth-child(3)').remove();
          $('.module-tools-list').find('li:nth-child(3)').remove();
        }
        
        $('body').find('.module-tools-list').append('<li class="tool">'+addUserBtn+'</li><li class="tool">'+reloadBtn+'</li>');
      }
        $('.user-module-tool-bar').find('.ctn-col-9').empty();
        $('.user-module-tool-bar').find('.ctn-col-1').empty();
        $('body').find('.module-tools-list .tool').css('width', '25%');
        $('.users-add-btn, .module-tools-list .back-btn').css({
          'position': 'initial'
        });
    }
    
  }

  isEmpty(el){
    return !$.trim(el.html())
  }


}
