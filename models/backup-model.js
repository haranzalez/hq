/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var fs = require('fs');
const { exec } = require('child_process');


module.exports = {
    
    backup: function(){
     var user='haranzalez',file='/Users/haranzalez/Desktop/hqsis/backups/BU-'+fecha()+'.sql'
     exec('touch /Users/haranzalez/Desktop/hqsis/backups/BU-'+fecha()+'.sql');
     exec('pg_dump -U '+user+' -F p hq > '+file);

     return 'Bakcup Done';
    }
    
    
}


function fecha(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+mm+yyyy;
    return today;
}