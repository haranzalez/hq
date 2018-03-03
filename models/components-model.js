

module.exports = {


    getAreas: function(db){
      var result = db.any('select * from areas').catch(err => { console.log(err); });
      return result;

    },
    getRoles: function(db, id){
      var result = db.any('select * from roles where id_area = '+id).catch(err => { console.log(err); });
      return result;

    },

    privilegiosYareas: function(db){
        var sql = "select * from areas";
        var dres = db.any(sql);
        var res = dres.then(function(d){
            var pkg = {
                areas: d
            }
            return pkg;

        }).then(function(pkg){
            var sql = "select * from privilegios";
            var dres = db.any(sql);
            return dres.then(function(d){
                pkg['privilegios'] = d;
                return pkg
            })
        })

        
        return res;
    }




};