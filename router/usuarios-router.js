


module.exports = function(app, db, sessionChecker, io) {

    var tbl = 'usuarios';
    app.get('/users', sessionChecker, function(req, res) {
       
        require('../controllers/usuarios-controller').getMain(req, res);
    });

    app.get('/users/:id', sessionChecker, function(req, res) {
        
        var ID = req.params.id;
        var crudParams = {
            bd: db,
            metodo: 'list',
            funcion: 'byIdBulk',
            record_id: ID
        }
        require('../controllers/usuarios-controller').getUserById(crudParams, res);
    });
   
    app.post('/users/create', sessionChecker, function(req, res) {
      
        req.body.db = db;
        req.body.io = io;
        var username = req.session.user;
        require('../controllers/usuarios-controller').createUser(req.body, res, username);
    });

    app.post('/users/createTable', function(req, res) {
        var crudParams = {
            bd: db,
            metodo: 'create',
            funcion: 'table',
            nueva_tabla: {
                nombre: "usuarios",
                fields: {
                    ID: "SERIAL PRIMARY KEY",
                    nombre: "TEXT NOT NULL",
                    usuario: "TEXT NOT NULL",
                    edad: "INT NOT NULL"
                }
            },
            tabla: tbl
        }
        require('../controllers/usuarios-controller').getUsers(crudParams, res);
    });

     

    app.post('/users/update/:id', sessionChecker, function(req, res) {
        var username = req.session.user;
        
        crudParams = {
            bd: db,
            metodo: 'update',
            funcion: 'record',
            data: req.body,
            record_id: req.params.id,
            io: io
        }

        require('../controllers/usuarios-controller').updateUser(crudParams, res, username);
    });

    app.get('/users/delete/:id', sessionChecker, function(req, res) {
        var username = req.session.user;
        crudParams = {
            bd: db,
            funcion: 'del_user',
            record_id: req.params.id,
            io: io
        }

        require('../controllers/usuarios-controller').delUser(crudParams, res, username);
    });

    app.get('/users/comp/filter', sessionChecker, function(req, res){
        crudParams = {
            bd: db,
            funcion: 'filter_users',
            type: 'usuarios',
            filter: req.query.estado
        }

        require('../controllers/usuarios-controller').sort(crudParams, res);
    });

    app.get('/users/comp/lista/:type', sessionChecker, function(req, res){
        crudParams = {
            bd: db,
            type: req.params.type,
            filter: 'todos'
        }
        require('../controllers/usuarios-controller').sort(crudParams, res);
    });

    app.get('/users/comp/createForm', sessionChecker, function(req, res){

        require('../controllers/usuarios-controller').getComponent({bd: db, comp: 'formUsers'}, res);
    });

    app.get('/users/comp/search/:keyword', sessionChecker, function(req, res){
        
        require('../controllers/usuarios-controller').search({bd: db, funcion: 'search_user', keyword: req.params.keyword}, res);
       
    });

    app.get('/users/block/:id', sessionChecker, function(req, res){
        var username = req.session.user;
        require('../controllers/usuarios-controller').block({db:db,id:req.params.id}, res, username)
    })
    app.get('/users/unblock/:id', sessionChecker, function(req, res){
        var username = req.session.user;
        require('../controllers/usuarios-controller').unblock({db:db,id:req.params.id}, res, username)
    })

    app.get('/users/logs/:type/:id', sessionChecker, function(req, res){
        
        require('../controllers/usuarios-controller').getLog({db:db,id_acceso:req.params.id, type: req.params.type}, res)
    })















};