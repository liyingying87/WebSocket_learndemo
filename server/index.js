const Ws = require('ws');
;((Ws)=>{

    const server = new Ws.Server({port:8000});

    const init =()=>{
        bindEvent();
    }
    init();
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
        console.log(msg);
    }
})(Ws);