module.exports = function(){





}



function buildTblHeadings(headings){
    return '<div class="ctn">';


        for(var prop in headings){
            '<div class="ctn-col-div">'+
        
                '<b>'+headings[prop]+'</b>'+
        
            '</div>';
        }
       

    '</div>';
}

function buildRecordsTbl(results){
    return '<div class="ctn">';
        for(var prop in results){
            '<div class="ctn-col-div">'+
        
                '<p>'+headings[prop]+'</p>'+
        
            '</div>';
        }
    
    '</div>';


}

function buildChangedValues(){

}