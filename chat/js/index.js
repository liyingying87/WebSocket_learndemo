;((doc,Socket,storage,location)=>{
const oList = doc.querySelector('#list');
const oMsg = doc.querySelector('#message');
const oSendBtn = doc.querySelector('#send');
const ws = new Socket('ws:localhost:8000');
let username = '';

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
    //从你的接收框框里面进行接收消息
    const msg = oMsg.value;
    if(!msg.trim().length){
        return;
    }
    ws.send(
        JSON.stringify( {
        user: username,
        dateTime: new Date().getTime(),
        message:msg
    })
       //仅仅是这样是不行的，必须要以json形式进行传递
    );

    oMsg.value = '';
// console.log('Send message.',e);
}

function handleOpen(e){
    console.log('Websocket Open',e);
    username = storage.getItem('username');
    if(!username){
        location.href = 'entry.html';//别拼错了，href，就是说要保证先有用户名字，再有消息。
        return;
    }
}

function handleClose(e){
console.log('Websocket Close',e);
}
function handleError(e){
    console.log('Websocket Error',e);

}
function handleMessage(e){
    console.log('Websocket message在这里接收消息');
    const msgData = JSON.parse(e.data);
    console.log(e.data);
    console.log(e.data.dateTime);
    console.log(msgData);
    oList.appendChild(createMsg(msgData));

}
function createMsg(data){

    const {user, dateTime,message} = data;
    const oItem = doc.createElement('li');
    oItem.innerHTML = `
    <p>
        <span> ${ user }</span>
        <i>${ new Date(dateTime)}</i>
    </p>
    <p>
      消息：${ message }
    </p>
    `;
    return oItem;
}
init();

})(document,WebSocket,localStorage,location);