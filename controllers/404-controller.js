var template = require('../views');
module.exports = function(db, res){
    res.send(template.build('404 page'));
}

