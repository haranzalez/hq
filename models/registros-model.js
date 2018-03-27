module.exports = {

    getAllRegistros: function(db){


        var sql = 'select * from registro_de_cambios order by id desc';
        return db.any(sql).catch(e => {
            console.log(e);
        })
    }


}