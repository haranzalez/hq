
module.exports = function(app, config){
    //SERVER INIT host: localhost, port: 8000
    app.listen(config.port, function(e){
        if(e){
            console.log(e)
        }
        console.log("Server live at http://" + config.host + ":" + config.port);
    })

}
