var reportsTblList = require('../views/Reportes/tables-list.js');
var model = require('../models/reports-model.js');
var previewTbl = require('../views/Reportes/displayTbl.js');
var tools = require('../views/Reportes/tools.js');
var messBox = require('../views/componentes/message-box.js');
var reportsSaved = require('../views/Reportes/reportes-guardados.js');

module.exports = {



	getTables: function(params){
            
		var response = model.getTbls(params);

		response.then(function(d){

			var pkg = []
			for(var prop in d){
				pkg.push(d[prop]['table_name'])
			}
			return pkg;

		}).then(function(d){
		   
                  params.res.send(reportsTblList(d, 'tbls'));
			
			
		})




	},

	getFields: function(params){

            var result = model.getFields(params);
            
            result.then(function(d){
                var arr = [];
                for(var prop in d)
                {
                    if(d[prop]['column_name'] == 'id')
                    {
                        delete d[prop]['column_name'] == 'id';
                    }else{
                        arr.push(d[prop]['column_name']);
                    }
                    
                }
                var pkg = {
                    arr: arr,
                    table: params.table
                }
                params.resp.send(reportsTblList(pkg, 'flds'));
            });

	},
        getFieldsDataAll: function(params){
            var result = model.getFieldsDataAll(params);
            
            result.then(function(d){
                 
                
                var resd = d.reduce((x, y) => {
                    for(let i in y) {
                      x[i] ? x[i].push(y[i]) : x[i] = [y[i]];
                    }
                    return x;
                }, []);
                console.log(resd);
                var tbl = previewTbl.tableRow(resd, params.table);
                params.res.send(tbl);
            })
        },
        
        getFieldsData: function(params){
            
            var result = model.getFieldsData(params);
            
            result.then(d => {
              
                var tbl = previewTbl.tableCol(d, params.field, params.table);
                
                params.resp.send(tbl);
            
            });
             
            
        },
        getFieldsDataById: function(params){
            
            var result = model.getFieldsDataById(params);
            
            result.then(d => {
              
                var tbl = previewTbl.tableCol(d, params.field, params.table);
                
                params.resp.send(tbl);
            
            });
             
            
        },
        
        components: function(params){
            switch(params.type){
                case "tblTools":
                    params.res.send(tools.tblTools(params.tname));
                break;
            }
        },

        saveReport: function(params){
            var mess = model.saveReport(params);
            
                params.res.send(messBox.success(mess));
       
        },
         savedReportsList: function(params){
            var result = model.savedReportsList(params);
            
            result.then(d => {
                console.log(d);
                var pkg = [];
                for(var prop in d){

                    pkg.push(reportsSaved.savedRepRes(d[prop]));
                }
                pkg = pkg.join('');

                params.res.send(pkg);
            })
            
       
        },
        getReport: function(params){
            var result = model.getReport(params);
            
            result.then(d => {
                console.log(d);
                

                params.res.send(d[0].html);
            })
            
       
        },
        delReport: function(params){
            var mess = model.delReport(params);
            params.res.send(messBox.success(mess));
        
        }







}

function convertToArr(obj){
    var arr = [];
    
    for(var prop in obj[0]){
        arr[prop] = obj[0][prop];
    }
    return arr;
}