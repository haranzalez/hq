
const users = require('./usuarios-router'),
      comp = require('./comp-router.js'),
      roles = require('./roles-router.js'),
      reports = require('./reports-route'),
      loginCtr = require('../controllers/login-controller'),
      compCtr = require('../controllers/components-controller.js'),
      backup = require('./backup-route'),
      notifications = require('../controllers/notifications.js'),
      registros = require('./registros-route');
      plataforma = require('../controllers/plataforma-controller');


module.exports = function(app, db, sessionChecker, io) {

  
var room = '';
var user = '';
var id_cuenta = '';



//LOGIN
  app.get('/', function(req, res){
    
    
    loginCtr.loginForm(res);

  })

  app.post('/', function(req, res){



    var credentials = {
        db: db,
        funcion: 'login',
        username: req.body.user,
        password: req.body.pass
    }
    loginCtr.login(credentials,req, res);
     
    
  })

  app.get('/signOut', function(req, res){

   
    loginCtr.signOut({db: db, id_cuenta: req.session.id_cuenta});
    req.session.destroy();
    res.send('done');


  })
//=======================================================================================================================================================


  app.get('/plataforma/:area/:rol/:id/:user', function(req, res){
    user = req.params.user;
    room = req.params.area;
    id_cuenta = req.session.id_cuenta;
    var pkg = {
        id_rol: req.params.id,
        nombre_rol: req.params.rol,
        nombre_area: req.params.area,
        res: res,
        user: req.params.user,
        db: db
      }
      plataforma.ecosis(pkg);

    
  })


  io.sockets.on('connection', function(socket){
  //add client to room once connected. Room name is the same as the rol name
    socket.join(room)
  //Welcoming client ot platform
    io.in('Admin').emit('user',notifications.users(user+' inicio session. '));

    socket.on('noti', function(user){
      io.in('Admin').emit('noti', notifications.dbChanges(user+' genero cambios en los registros. '));
    })

    socket.on('report', function(user){
      io.in('Admin').emit('noti', notifications.dbChanges(user+' genero reporte. '));
    })

    io.in('Admin').emit('username', user)

    socket.on('disconnect', function(){
     
      io.in('Admin').emit('offuser',notifications.users(user+' termino session. '));
      loginCtr.signOut({db: db, id_cuenta: id_cuenta});
    })

  })
  

  reports(app, db, sessionChecker);
  backup(app, db, io, sessionChecker);
  registros(app, db, sessionChecker);
  users(app, db, sessionChecker, io);
  comp(app,db, sessionChecker);
  roles(app,db, sessionChecker);
};
