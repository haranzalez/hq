pg = require('pg'),//modulo para manejo de base de datos Postgres
blueBird = require('bluebird'),//modulo para el mejor manejo de ES6 promises
pgp = require('pg-promise')({promiseLib: blueBird});//modulo para con integracion de bluebird para el mejor manejo de ES6 promises con postgres

module.exports = function(type){
	switch (type){
		case 'dbcred':
		//CONFIGURACION servidor y base de datos
		const config = {
			user: 'root',
			pass: 'Hquintero*17',
			host: '172.30.10.18:5432',
			database: 'hqdb'
		}

		//coneccion a base de datos Postgres con modulo pg-promise 
		var connectionString = 'postgres://'+config.user+':'+config.pass+'@'+config.host+'/'+config.database;
		var db = pgp(connectionString);//callback se retiene en var db
		return db;
		break;

	}
}