/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var bmodel = require('../models/backup-model.js');

module.eports = {
    
    backup: function(db,table, res){
        
        bmodel.backup(db,table);
        
        
    }
    
    
}