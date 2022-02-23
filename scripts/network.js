let webSocket = new WebSocket('wss://brintonliteraryagency.org/wss/', 'protocolOne');
// let webSocket = new WebSocket('ws://localhost:8080');
var ready = false;

let allBodies = [];
let circles = [];

function sendMessage(message) {
    message.data.id = id;
        webSocket.send(JSON.stringify(message));
}

function createMessage(message) {

}

webSocket.onmessage = function(message) {
    const data = JSON.parse(message.data);
    const {projectiles, log, playerPosition, force, spawned} = data;
    if (id === data.id) return;
    if (data.log) {
        onMessageReceive(data.log);
        return;
    }
    if(playerPosition) movePlayerAvatar(playerPosition, force, data.id, spawned);
}

webSocket.onopen = function(message) {
    console.log('opening')
    waitToStart();
    ready = true;
}

