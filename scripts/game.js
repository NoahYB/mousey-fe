var width = 1000;
var height = 700;
if (localStorage.getItem('id')) {
    var id = localStorage.getItem('id');
    console.log(id);
} else {
    var id = Date.now();
    localStorage.setItem('id', id);
}
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite;
    Vector = Matter.Vector;
// create an engine
var engine = Engine.create();

const renderableObjects = [];
let entities = createMap(width, height);
renderableObjects.push(...entities);
let avatars = [];
let players = {};

// add all of the bodies to the world
Composite.add(engine.world, entities);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

window.addEventListener('keypress', setKey, false);
window.addEventListener('keyup', releaseKey, false);
window.addEventListener('keydown', pressKey, false);
window.addEventListener('mousedown', (e) => mouseDown = true);
window.addEventListener('mouseup', setMousePos);

let mousePos = {x:0,y:0};
let keymap = {KeyW:false, KeyA:false, KeyS:false, KeyD:false, Space:false};
let playerVelo = {x:0,y:0};
let moveSpeed = .0001;
let jumpSpeed = .007;
let fireSpeed = .001;
let player = Bodies.circle(200 * Math.random(),200 * Math.random(),10);
player[id] = true;
players[id] = player;
avatars.push(player);
player.bodyType = 'circle';
player.label = 'friendly';
renderableObjects.push(player);
let grounded = false;
let canDoubleJump = true;
let mouseDown = false;
let mouseReleased = false;
let mouseTimer = 0;
const epsilon = -20;
Composite.add(engine.world, player);
const delay = ms => new Promise(res => setTimeout(res, ms));
function waitToStart() {
    Matter.Events.on(engine, "beforeUpdate", update);
    Matter.Events.on(engine, "collisionActive", collisionHandle);
    console.log('sending data');
    sendMessage({data: {
        playerPosition: player.position,
        id,
        spawned:true
    }})
}

let counter = document.getElementById("counter");
let charge = document.getElementById("charge");
let canvas = document.getElementsByTagName("canvas")[0];
// counter.textContent="0";
counter.style.color='salmon';
let chargeSpeed = 8/20;

function update() {
    characterInput();
    move(player);
    clearCanvas();
    renderFrame(entities);
    renderFrame(avatars);
    collisionHandle();
    despawn();
}
function despawn() {

}

function collisionHandle() {
    entities.map((ground) => {
        if(Matter.SAT.collides(player, ground).collided) {
            grounded = true;
            canDoubleJump = true;
        } else grounded = false;
    });
}

function move(body) {
    Body.applyForce(body,body.position,playerVelo);
    sendMessage({data: {
            playerPosition: body.position,
            force: playerVelo,
            id,}})
}

function characterInput() {
    if(grounded) moveSpeed = .0002 * 1.2;
    else moveSpeed = .00025;
    if(grounded){
        if(keymap['KeyW'] || keymap['Space']) playerVelo.y = -1 * jumpSpeed;
        else if(keymap['KeyS']) playerVelo.y = 1 * jumpSpeed;
        else playerVelo.y = 0;
        keymap['Space'] = false;
    } else if(canDoubleJump && keymap['Space']) {
        if(keymap['KeyW'] || keymap['Space']) playerVelo.y = -1 * jumpSpeed * 2;
        else if(keymap['KeyS']) playerVelo.y = 1 * jumpSpeed * 2;
        else playerVelo.y = 0;
        keymap['Space'] = false;
        canDoubleJump = false;
    }
    else playerVelo.y = 0;

    if(keymap['KeyA']) playerVelo.x = -1 * moveSpeed;
    else if(keymap['KeyD']) playerVelo.x = 1 * moveSpeed;
    else playerVelo.x = 0;

    if(mouseDown) {
        mouseTimer += chargeSpeed;
    }
    if(mouseReleased) {
        //console.log('mouseDown');
        fire();
        mouseReleased = false;
        mouseDown = false;
    }
}

function fire() {
    mouseTimer = Math.min(5,Math.floor(mouseTimer));
    let playerForce = Vector.create(0,0);
    let force = Vector.sub(mousePos,player.position);
    force = Vector.normalise(force);
    force.x *= fireSpeed;
    force.y *= fireSpeed;
    playerForce = Vector.add(Vector.mult(force,-4 * mouseTimer), playerForce);
    playerVelo.x += playerForce.x;
    playerVelo.y += playerForce.y;
    mouseTimer = 0;
}

function setKey(e) {
    for(key in keymap){
        if(key === e.code){
            keymap[key] = true;
        }
    }
}

function releaseKey(e) {
    keymap[e.code] = false;
}

function pressKey(e) {
    keymap[e.code] = false;
}

function setMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    mousePos = {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
    mouseReleased = true;
}

function movePlayerAvatar(pos, force, enemyID, spawned) {
    if (players[enemyID] && !spawned) {
        players[enemyID].position = pos;
        Body.applyForce(players[enemyID],pos, force);
    } else {
        if (spawned) {
            avatars[enemy.renderIndex] = undefined;
            Composite.remove(engine.world, players[enemyID]);
        }
        players[enemyID] = createPlayerAvatar(pos, spawned);
        Body.applyForce(players[enemyID],players[enemyID].position, force);
    }
}

function createPlayerAvatar(pos, spawned) {
    console.log('creating');
    let enemy = Bodies.circle(pos.x,pos.y,10);
    Composite.add(engine.world, enemy)
    enemy.bodyType = 'circle';
    enemy.label = 'enemy';
    avatars.push(enemy);
    enemy.renderIndex = avatars.length - 1;
    return enemy;
}