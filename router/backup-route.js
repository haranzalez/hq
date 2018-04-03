/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var controller = require('../controllers/backups-controller.js');
var messBox = require('../views/componentes/message-box');
module.exports = function(app, db, io, sessionChecker){
    
    
    app.get('/backup',sessionChecker, function(req, res){
    
     
        controller.backup(db, res);
    })
    app.get('/getBackups',sessionChecker, function(req, res){
        var params = {
            db: db,
            res:res
        }

        controller.getBackups(db,res);
    })
    app.get('/programBackUp/:hour/:period',sessionChecker, function(req, res){
        var params = {
            db: db,
            res: res,
            io: io,
            data: req.params
        }
  
        controller.scheduleBackup(params);

    })
}
