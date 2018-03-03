var reportsCtr = require('../controllers/reports-controller.js');

module.exports = function(app,db, sessionChecker){


	app.get('/reports', function(req, res){
             var pkg = {
			db: db,
			keyword: 'all',
			res: res
		};
       
	    reportsCtr.getTables(pkg);

	});
        app.get('/reports/search/:keyword', function(req, res){
             var pkg = {
			db: db,
			keyword: req.params.keyword,
			res: res
		};
	    reportsCtr.getTables(pkg);

	});

	app.get('/reports/:table', function(req, res){

		var pkg = {
			db: db,
			table: req.params.table,
			resp: res
		};

		reportsCtr.getFields(pkg);

	});
        app.get('/reports/table/all/:table', function(req, res){

		var pkg = {
			db: db,
			table: req.params.table,
			res: res
		};

		reportsCtr.getFieldsDataAll(pkg);

	});
        
        app.get('/reports/:table/:field', function(req, res){
		var pkg = {
			db: db,
                        user: req.session.user,
			table: req.params.table,
                        field: req.params.field,
			resp: res
		};

		reportsCtr.getFieldsData(pkg);

	});
        
        
         app.get('/reports/:table/:field/:id', function(req, res){
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
        
        app.get('/reportes/herramientas/:id/:tname', function(req, res){
            var pkg = {
                    type: req.params.id,
                    tname: req.params.tname,
                    res:res
		};
            reportsCtr.components(pkg);
        });
        
       



};