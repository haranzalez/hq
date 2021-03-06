//INTEGRACION de modulos [express, pg, body-parser, bluebird, pg-promise] 
const 
	express = require('express'),
    http = require('http'),
    app = require('express')(),//modulo para manejo de servidor y router
    bodyParser = require('body-parser'),//modulo para manejo de URLs
    session = require('express-session'),//
    cookie = require('cookie-parser'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

 
   

//Setting data transfer limit form 1mb to 50mb
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    
//BASE DE DATOS [POSTGRES]
var db = require('./db_components.js')('dbcred');

//integracion de middelware para bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));

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
        res.send('redirect');
    }    
};


//middleware para uso de archivos estaticos como .css .js .png .jpg
app.use('/estaticos', express.static('assets'))
//Backups middleware

app.use('/backups', express.static('Backups'))


//ROUTER
require('./router')(app, db, sessionChecker, io);

//SERVIDOR
require('./server.js')(server);

