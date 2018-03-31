/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fs = require('fs');
const { exec } = require('child_process');


module.exports = {
    
    backup: function(params){
     var fileName = params.fileName;
     var user='haranzalez',file='/Users/haranzalez/Desktop/hqsis/Backups/'+fileName;
     exec('touch /Users/haranzalez/Desktop/hqsis/Backups/'+fileName);
     exec('pg_dump -U '+user+' -F p hq > '+file);
     var fecha = new Date();
  
    
     return 'Backup <b>'+fileName+'</b> terminado.';
    },

    lastBackup: function(db){
        var sql = "SELECT DISTINCT ON ('id') * FROM  backups_programmer  ORDER  BY id, 'fecha' DESC NULLS LAST;";
        return db.any(sql);
    }
    
    
}




