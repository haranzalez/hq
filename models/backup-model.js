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
    var user='haranzalez',file='/opt/hqapp/Backups/'+fileName;
    exec('ssh root@172.30.10.18 "PGPASSWORD=Hquintero*17 pg_dump -U root -F p -h localhost -c hqdb" >> /opt/hqapp/Backups/'+fileName);
    var fecha = new Date();


    return 'Backup <b>'+fileName+'</b> terminado.';
    },

    lastBackup: function(db){
        var sql = "SELECT DISTINCT ON ('id') * FROM  backups_programmer  ORDER  BY id, 'fecha' DESC NULLS LAST;";
        return db.any(sql);
    }
    
    
}




