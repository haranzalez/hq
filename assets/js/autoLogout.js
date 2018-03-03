//AUTOLOGOUT
class AutoLogout {

  construir() {
    console.log('setting...');
    this.events = ['load', 'mousemove', 'mousedown',
                   'click', 'scroll', 'keypress'];

    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for(var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }

  clearTimeout() {
    if(this.warnTimeout)
      clearTimeout(this.warnTimeout);

    if(this.logoutTimeout)
      clearTimeout(this.logoutTimeout);
  }

  setTimeout() {

    this.warnTimeout = setTimeout(this.warn, 900000 - 60000);//14 minutos

    this.logoutTimeout = setTimeout(this.logout, 900000);//15 minutos
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    $.ajax({
      url: 'http://localhost:8000/recursos/componentes/bw/Su session terminara por inactividad en exactamente 1 minuto.',
      type: 'get',
      success: function(res){
        $('body').append(res);
      }
    })
  }

  logout() {
    // Send a logout request to the API
    console.log('Enviando logout a API....');
    $.ajax({
      url: 'http://localhost:8000/signOut',
      type: 'get',
      success: function(res){
        if(res == 'done'){
          this.destroy();  // Cleanup
          window.location = 'http://localhost:8000/';

        }  
      }
    })
    
  }

  destroy() {
    console.log('destroyed');
    this.clearTimeout();

    for(var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }
}