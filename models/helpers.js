module.exports = {

	 renderUpdate: function(par){
        var numElms = 0;
        for (var prop in par) {
            numElms++;
        }

        var count = 0;
        var s = '';
        for (var prop in par) {
            count++;
            if (count < numElms) {
                s = s + prop + "='" + par[prop] + "',";
            } else {
                s = s + prop + "='" + par[prop] + "'";
            }
        }
        return s;
    },

    renderUpdateConditions: function(par){
        var numElms = 0;
        for (var prop in par) {
            numElms++;
        }

        var count = 0;
        var s = ' and ';
        for (var prop in par) {
            count++;
            if (count < numElms) {
                s = s + prop + " IS DISTINCT FROM '" + par[prop] + "' or ";
            } else {
                s = s + prop + " IS DISTINCT FROM '" + par[prop] + "'";
            }
        }
        return s;
    }


}