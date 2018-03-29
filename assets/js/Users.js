

class Users{


  listUsers() {
    var cls = this;
    $.ajax({
      url: '/users/comp/lista/usuarios',
      type: 'get',
      success: function(res){
        cls.redir(res)
        $('.list-result-ctn div').remove();
        $('body').find('.list-result-ctn').append(res);
      }
    })
  }

  listRols(){
    var cls = this;
    $.ajax({
      url: '/users/comp/lista/roles',
      type: 'get',
      success: function(res){
        cls.redir(res)
        $('.list-result-ctn div').remove();
        $('body').find('.list-result-ctn').append(res);
      }
    })
  }

  createUserForm(){
  
    var cls = this;
      $.ajax({
        url: '/users/comp/createForm',
        type: 'get',
        success: function(res){
          cls.redir(res)
          $('body').find('.users-forms-ctn').empty().append(res);
          
        }
      })
    
    
  }

  createRolForm(){
    var cls = this;
    $.ajax({
      url: '/recursos/componentes/f2/none/none',
      type: 'get',
      success: function(res){
        console.log(res)
        cls.redir(res)
        $('body').find('.users-forms-ctn').empty().append(res);

      }
    })
  }

  getAreasWindow(){
    var cls = this;
    $.ajax({
      url: '/recursos/componentes/w1/none/none',
      type: 'get',
      success: function(res){
        cls.redir(res)
        $('body').find('.mobile-window-ctn .back-btn').hide();
        $('body').find('.mobile-window-ctn .ctn').empty().append(res);
      }
    })
  }

  updateRol(data){
    var cls = this;
    $.ajax({
      data: data,
      url: '/roles/update/',
      type: 'post',
      success: function(res){
        cls.redir(res)
        $('body').append(res);
      }
    })
  }

  getMenu(pkg){
    var cls = this;
     $.ajax({
      url: '/recursos/componentes/'+pkg.menuId+'/'+pkg.type+'/'+pkg.entId,
      type: 'get',
      success: function(res){
        console.log(res)
        cls.redir(res)
        $('body').find('.users-filter-nav').empty().append(res);
      }
    })
  }

  getLogs(elm){
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
            $('.list-result-ctn div').remove();
            $('.list-result-ctn').append(res);
            cls.getMenu({menuId:'sub-user-logs', type: type, entId: id});
            $('.user-module-tool-bar').find('.back-btn').find('svg').removeClass().addClass('fas fa-arrow-left');
          }
         
           
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


}
