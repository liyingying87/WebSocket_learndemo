;((doc,Socket)=>{
const oList = doc.querySelector('#list');
const oMsg = doc.querySelector('message');
const oSendBtn = doc.querySelector('#send');
const ws = new Socket('ws:localhost:8000');

const init=()=>{
    bindEvent();
}
function bindEvent(){
    oSendBtn.addEventListener('click',handleSendBtnClick,false);
//     1. open
// 2. close
// 3. error
// 4. message
    ws.addEventListener('open',handleOpen,false);
    ws.addEventListener('close',handleClose,false);
    ws.addEventListener('error',handleError,false);
    ws.addEventListener('message',handleMessage,false);

}
function handleSendBtnClick(e){
console.log('Send message.',e);
}

function handleOpen(e){
    console.log('Websocket Open',e);

}

function handleClose(e){
console.log('Websocket Close',e);
}
function handleError(e){
    console.log('Websocket Error',e);

}
function handleMessage(e){
    console.log('Websocket message在这里接收消息',e);

}

init();

})(document,WebSocket);