let s = '';
const messageCenter = document.getElementById('message');
function onMessageReceive(char) {
    s += char;
    if (s.length > 100) {
        s = shiftString(s);
    }
    messageCenter.innerHTML = s;
}
function shiftString(str) {
    let arr = str.split("");
    arr.shift();
    return arr.join("");
}