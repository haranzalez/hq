/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fs = require('fs');


module.exports = {
    
    backup: function(db, table){
       var sql = "select * from "+table;
       var res = db.any(sql);
       res.then(function(d){
           fs.appendFile('../backups/prueba.json', d, function (err) {
            if (err) throw err;
            console.log('Back up creado');
          });
       })
    }
    
    
}

