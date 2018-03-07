

class Users{


  listUsers() {
    $.ajax({
      url: 'http://localhost:8000/users/comp/lista/usuarios',
      type: 'get',
      success: function(res){
        $('.list-result-ctn div').remove();
        $('body').find('.list-result-ctn').append(res);
      }
    })
  }

  listRols(){
    $.ajax({
      url: 'http://localhost:8000/users/comp/lista/roles',
      type: 'get',
      success: function(res){
       
        $('.list-result-ctn div').remove();
        $('body').find('.list-result-ctn').append(res);
      }
    })
  }

  createUserForm(){
  

      $.ajax({
        url: 'http://localhost:8000/users/comp/createForm',
        type: 'get',
        success: function(res){
         
          $('body').find('.users-forms-ctn').empty().append(res);
        }
      })
    
    
  }

  createRolForm(){
    $.ajax({
      url: 'http://localhost:8000/recursos/componentes/f2/none/none',
      type: 'get',
      success: function(res){
        $('body').find('.users-forms-ctn').empty().append(res);
      }
    })
  }

  getAreasWindow(){
    $.ajax({
      url: 'http://localhost:8000/recursos/componentes/w1/none/none',
      type: 'get',
      success: function(res){
        $('body').find('.mobile-window-ctn .back-btn').hide();
        $('body').find('.mobile-window-ctn .ctn').empty().append(res);
      }
    })
  }

  updateRol(data){
    $.ajax({
      data: data,
      url: 'http://localhost:8000/roles/update/',
      type: 'post',
      success: function(res){

        $('body').append(res);
      }
    })
  }

  getMenu(pkg){
    console.log(pkg);
     $.ajax({
      url: 'http://localhost:8000/recursos/componentes/'+pkg.menuId+'/'+pkg.type+'/'+pkg.entId,
      type: 'get',
      success: function(res){
        $('body').find('.users-filter-nav').empty().append(res);
      }
    })
  }

  getLogs(elm){
    var cls = this;
    var id = elm.attr('data-id');
    var type = elm.attr('data-type');
    $.ajax({
        url: 'http://localhost:8000/users/logs/'+type+'/'+id,
        type: 'get',
        success: function(res){
          if(res.mess){

            $('body').append(res.mess);
          }else{
            $('.list-result-ctn div').remove();
            $('.list-result-ctn').append(res);
            cls.getMenu({menuId:'sub-user-logs', type: type, entId: id});
          }
         
           
        }
    });
  }

  createUser(){
    
  }

  hideForms(){
    console.log('hiding');
    
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
