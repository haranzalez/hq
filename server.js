
module.exports = function(app){
    //SERVER INIT host: localhost, port: 8000
    const config = {
        host: '127.0.0.1',
        port: 5000
    }
    app.listen(config.port, function(e){
        if(e){
            console.log(e)
        }

        console.log("Server live at http://" + config.host + ":" + config.port);
    })

}
