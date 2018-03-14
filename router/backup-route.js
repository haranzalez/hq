/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var controller = require('../controllers/backups-controller.js');
module.exports = function(app, db){
    
    
    app.get('/backup', function(req, res){
        console.log(controller);
        controller.backup(db, res);
    })
}
