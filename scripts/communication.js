let s = '';
let s_h = '';
var randomColor = Math.floor(Math.random()*16777215).toString(16);
const messageCenter = document.getElementById('message');
const messageCenterHome = document.getElementById('messageyou');
console.log(messageCenterHome);
//message-you
const keyMap = {
    'Enter': (sd) => '',
    'Backspace': (sd) => sd.substring(0, sd.length - 1),
}

// s
function onMessageReceive(char) {
    if (keyMap[char]) {
        s = keyMap[char](s)
        messageCenter.innerHTML = s;
        return;
    }
    s += char;
    if (s.length > 100) {
        s = shiftString(s);
    }
    messageCenter.innerHTML = s;
}

// s_h
function onMessageSend(char) {
    console.log('testing');
    if (keyMap[char]) {
        s_h = keyMap[char](s_h)
        messageCenterHome.innerHTML = s_h;
        return;
    }
    s_h += char;
    if (s_h.length > 100) {
        s_h = shiftString(s_h);
    }
    messageCenterHome.innerHTML = s_h;
}

function shiftString(str) {
    console.log(str);
    let arr = str.split("");
    arr.shift();
    return arr.join("");
}
