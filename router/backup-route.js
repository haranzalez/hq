/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var controller = require('../controllers/backups-controller.js');
module.exports = function(app, db){
    
    
    app.get('/backup/:table', function(req, res){
        var table = req.params.table;
        controller.backup(db, table, res);
    })
}
