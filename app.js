//INTEGRACION de modulos [express, pg, body-parser, bluebird, pg-promise] 
const 
	express = require('express'),
    http = require('http'),
	cookieParser = require('cookie-parser'),
    app = require('express')(),//modulo para manejo de servidor y router
    bodyParser = require('body-parser'),//modulo para manejo de URLs
    session = require('express-session'),//
    cookie = require('cookie-parser'),
    morgan = require('morgan'),
    server = http.createServer(app),
    bcrypt = require('bcrypt');
    var serveIndex = require('serve-index');
    var serveStatic = require('serve-static');
    var io = require('socket.io').listen(server);

 
   

//Setting data transfer limit form 1mb to 50mb
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    
//BASE DE DATOS [POSTGRES]
var db = require('./db_components.js')('dbcred');

//CONFIGURACION servidor y base de datosnodemon

const config = require("./config.json");
//integracion de middelware para bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
//HTTP REQUEST LOGGIN
//app.use(morgan('dev'));
//COOKIE PARSER INIT FOR THE USE OF COOKIES AND SESSIONS
app.use(cookie());
//SESSION INIT TO HANDLE SESSIONS
app.use(session({
    key: 'id_acceso',
    secret: 'hq',
    resave: false,
    saveUninitialized: false
}));
//MIDDLEWARE TO CHECK IF COOKIE EXIST
app.use((req, res, next) => {
    if (req.cookies.id_acceso && !req.session.user) {
        res.clearCookie('id_acceso');        
    }
    next();
});
//MIDDEL WARE TO CHECK FOR LOGGED IN USERS
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.id_acceso && req.session.id_cuenta) {
        next();
    } else {
        res.redirect('/');
    }    
};
//MIDDLE WARE TO LOG CHANGES IN RECORDS
var setUserForChanges = (req, res, next) => {
    
    var user = req.params.user;
    db.any("SET hq.usuario = '"+user+"'");
    next();
  
}













//middleware para uso de archivos estaticos como .css .js .png .jpg
app.use('/estaticos', express.static('assets'))
//Backups middleware
app.use('/backups', serveIndex('backups', {icons: true, stylesheet: 'http://'+config.host+':'+config.port+'/estaticos/css/hq.css'}));
app.use('/backups', express.static('backups'))


//ROUTER
require('./router')(app, db, sessionChecker, io, setUserForChanges);

//SERVIDOR
require('./server.js')(server,config);

