module.exports = {

    mainTemplate: function(files){

        var html = '<div class="backups-main-ctn"><div class="backups-table-list-ctn">'+
        '<div class="ctn">';
        files.forEach(file => {
            html = html+'<div class="ctn-col-2">'+file+'</div>';
        });

        html = html+'</div>'+
        '</div>';

        return html;


    }



}