module.exports = function(app, db) {
     app.get('*', function(req, res){
       require('../controllers/404-controller')(db, res);
    });
};


