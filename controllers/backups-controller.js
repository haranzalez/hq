/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const fs = require('fs');
var template = require('../views/Backups');


var bmodel = require('../models/backup-model.js');

module.exports = {
    
    backup: function(db, res){
        console.log(process.cwd())
        res.send(bmodel.backup());
        
        
    },
    getBackups: function(res){
        const folder = './backups/';
        

        fs.readdir(folder, (err, files) => {
            res.send(template.mainTemplate(files));
        })
            
    }
    
    
}