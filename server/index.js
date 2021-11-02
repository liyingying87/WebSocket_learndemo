const Ws = require('ws');
;((Ws)=>{

    const server = new Ws.Server({port:8000});

    const init =()=>{
        bindEvent();
    }
 
    function bindEvent(){
        server.on('open',handleOpen);
        server.on('close',handleClose);
        server.on('error',hanleError);
        server.on('connection',handleConnection);
    }
    function handleOpen(){
        console.log('Websocket Open');
    }
    function handleClose(){
        console.log('Websocket Close');

    }
    function hanleError(){
        console.log('Websocket Error');

    }
    function handleConnection(ws){
        console.log('Websocket connected');
        ws.on('message',handleMessage);

    }
    function handleMessage(msg){
        //接收到消息
        server.clients.forEach(function (c){
            c.send(msg.toString());
        })
        console.log(msg);
        console.log(typeof(msg));
        console.log(msg.toString());
        console.log('后台收到的是'+ msg);
    }
    init();
})(Ws);