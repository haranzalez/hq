const model = require('../models/registros-model.js');
const view = require('../views/Registros');


module.exports = {


    getRegistros: function(params){
        
        var result = model.getAllRegistros(params.db);
        result.then(d => {
            
       
        for(var prop in d){
            var nuevo;
            var anterior;
            for(var prop2 in d[prop]){
                if(prop2 == 'valor_anterior' || prop2 == 'valor_nuevo'){
                    
                    if(prop2 == 'valor_nuevo'){
                        nuevo = Object.assign({}, d[prop][prop2])
                        
                    }  
                    if(prop2 == 'valor_anterior'){
                        anterior = Object.assign({}, d[prop][prop2])
                    }
                }
             
            }
            
            if(Object.keys(nuevo).length > 0 && Object.keys(anterior).length > 0){
                for(var prop3 in nuevo){
                    if(Object.values(anterior).indexOf(nuevo[prop3]) === -1){
                        d[prop]['valor_anterior'][prop3] = anterior[prop3]
                        d[prop]['valor_nuevo'][prop3] = nuevo[prop3]
                 
                        
                    }else{
                        
                        delete d[prop]['valor_anterior'][prop3];
                        delete d[prop]['valor_nuevo'][prop3];
                    }
    
                }

            }else if(Object.keys(nuevo).length > 0 && Object.keys(anterior).length == 0){
                
                d[prop]['valor_anterior'] = 'NA';
                d[prop]['valor_nuevo'][prop3] = nuevo[prop3];

            }else if(Object.keys(nuevo).length == 0 && Object.keys(anterior).length > 0){
                d[prop]['valor_anterior'][prop3] = anterior[prop3];
                d[prop]['valor_nuevo'] = 'NA';

            }



            
           
            
            
        }
    
           var arr = [];
           var count = 0;
        for(let prop in d){

               
                copy = Object.assign({}, d[prop]);
                var obj = '';
              
                if(Object.keys(d[prop]['valor_nuevo']).length > 0 && Object.keys(d[prop]['valor_anterior']).length > 0 || Object.keys(d[prop]['valor_nuevo']).length > 0 && Object.keys(d[prop]['valor_anterior']).length == 0){
                    obj = d[prop]['valor_nuevo'];
                }else if(Object.keys(d[prop]['valor_nuevo']).length == 0 && Object.keys(d[prop]['valor_anterior']).length > 0){
                    obj = d[prop]['valor_anterior'];
                }
               
                for(var prop4 in obj)
                {
                    
                    var final = Object.assign({}, copy);
                    delete final['valor_anterior'];
                    delete final['valor_nuevo'];
                    final['valor_anterior'] = (copy['valor_anterior'] == 'undefined')?'NA':copy['valor_anterior'][prop4];
                    final['valor_nuevo'] = (copy['valor_nuevo'] == 'undefined')?'NA':copy['valor_nuevo'][prop4];
                    final['campo'] = prop4;
                    arr.push(final);
                    final = '';
                    count++
                }

           }
       

          console.log(arr)
        params.res.send(view(arr));
           
        });

    

    }




}





function deepEqual(x, y) {//Function to compare 2 json obj. return value [BOOL]
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
  }