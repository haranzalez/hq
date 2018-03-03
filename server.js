
module.exports = function(app, config){
    //SERVER INIT host: localhost, port: 8000
    app.listen(config.port, function(){
        console.log("Server live at http://" + config.host + ":" + config.port);
    })

}
