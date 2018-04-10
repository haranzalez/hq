var reportsCtr = require('../controllers/reports-controller.js');
var reportSheet = require('../views/Reportes/report-sheet.js');

module.exports = function(app,db, sessionChecker){


	app.get('/reports',sessionChecker, function(req, res){
             var pkg = {
			db: db,
			keyword: 'all',
			res: res
		};
       
	    reportsCtr.getTables(pkg);

	});
        app.get('/reports/search/:keyword',sessionChecker, function(req, res){
             var pkg = {
			db: db,
			keyword: req.params.keyword,
			res: res
		};
	    reportsCtr.getTables(pkg);

	});

	app.get('/reports/:table',sessionChecker, function(req, res){

		var pkg = {
			db: db,
			table: req.params.table,
			resp: res
		};

		reportsCtr.getFields(pkg);

	});
        app.get('/reports/table/all/:table',sessionChecker, function(req, res){

		var pkg = {
			db: db,
			table: req.params.table,
			res: res
		};

		reportsCtr.getFieldsDataAll(pkg);

	});
        
        app.get('/reports/:table/:field',sessionChecker, function(req, res){
		var pkg = {
			db: db,
                        user: req.session.user,
			table: req.params.table,
                        field: req.params.field,
			resp: res
		};

		reportsCtr.getFieldsData(pkg);

	});
        
        
         app.get('/reports/:table/:field/:id',sessionChecker, function(req, res){
		var pkg = {
			db: db,
                        user: req.session.user,
			table: req.params.table,
                        field: req.params.field,
                        id: req.params.id,
			resp: res
		};

		reportsCtr.getFieldsDataById(pkg);

	});
        
        app.get('/reportes/herramientas/:id/:tname',sessionChecker, function(req, res){
            var pkg = {
                    type: req.params.id,
                    tname: req.params.tname,
                    res:res
		};
            reportsCtr.components(pkg);
        });


        app.post('/reportes/guardar',sessionChecker, function(req, res){
            var pkg = {
            	db: db,
                html: req.body.html,
                nombre: req.body.nombre,
                id_cuenta: req.session.id_cuenta,
                res:res
			};
            reportsCtr.saveReport(pkg);
        });
         app.get('/reportes/guardados',sessionChecker, function(req, res){
            var pkg = {
            	db: db,
                id_cuenta: req.session.id_cuenta,
				res:res,
				user:req.session.user
			};
            reportsCtr.savedReportsList(pkg);
        });
         app.get('/reportes/guardados/:id',sessionChecker, function(req, res){
            var pkg = {
            	db: db,
                id_cuenta: req.session.id_cuenta,
                reportID: req.params.id,
                res:res
			};
            reportsCtr.getReport(pkg);
        });
         app.get('/reportes/guardados/eliminar/:id',sessionChecker, function(req, res){
            var pkg = {
            	db: db,
                id: req.params.id,
                res:res
			};
            reportsCtr.delReport(pkg);
		});
		
		app.get('/reportes/sheet', sessionChecker, function(req, res){
			res.send(reportSheet(req.session.user));
		})
        
       



};