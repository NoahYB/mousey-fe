var width = 1000;
var height = 700;
if (localStorage.getItem('id')) {
    var id = localStorage.getItem('id');
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

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width,
        height,
    }
});

let entities = createMap(width, height);
let projectiles = [];
let players = {};

// add all of the bodies to the world
Composite.add(engine.world, entities);

// run the renderer
Render.run(render);

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
let grounded = false;
let canDoubleJump = true;
let mouseDown = false;
let mouseReleased = false;
let mouseTimer = 0;

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
counter.textContent="0";
counter.style.color='salmon';
let chargeSpeed = 8/20;

function update() {
    characterInput();
    move(player);
    collisionHandle();
    counterHandle();
    chargeHandle();
    despawn();
}
function despawn() {
    const deProject = projectiles.filter((proj) => {
        proj.time += 1;
        return proj.time >= 300;
    })
    deProject.map((proj) => {
        console.log(deProject);
        Composite.remove(engine.world, proj);
    })
    projectiles = projectiles.filter((proj) => {
        return proj.time < 300;
    })
}
function chargeHandle() {
    let count = Math.min(5,mouseTimer);
    charge.style.width = count * 30/5 + 'px';
    charge.style.top = player.position.y + 90 + 'px';
    charge.style.left = player.position.x + -10 + 'px';
    charge.style.backgroundColor = 'rgb(' + count * 60 + ',50,50)'
}
function counterHandle() {
    let count = Math.min(5,Math.floor(mouseTimer));
    counter.textContent = count;
    if(count >= 5) {
        counter.style.color='red';
    } else {
        counter.style.color='salmon';
    }
    counter.style.top = player.position.y + 105 + 'px';
    counter.style.left = player.position.x + 4 + 'px';
}
function collisionHandle() {
    entities.map((ground) => {
        if(Matter.SAT.collides(player, ground).collided){
            grounded = true;
            canDoubleJump = true;
        } else grounded = false;
    });
    for (let i = 0; i < projectiles.length; i++) {
        const projectile = projectiles[i];
        if(Matter.SAT.collides(player, projectile).collided){
            grounded = true;
            canDoubleJump = true;
        } else grounded = false;
    }
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
    const projectilesToSend = [];
    for(let i = 0; i < mouseTimer; i++) {
        let bullet = Bodies.circle(player.position.x,player.position.y,3);
        Composite.add(engine.world, bullet,{ isStatic: true })
        let force = Vector.sub(mousePos,player.position);
        force = Vector.normalise(force);
        force.x *= fireSpeed;
        force.y *= fireSpeed;
        //force.y += -gravity.y * gravity.scale * body.mass;
        Body.applyForce(bullet,bullet.position,force);
        const playerForce = (Vector.mult(force,-4));
        playerVelo.x += playerForce.x;
        playerVelo.y += playerForce.y
        bullet[id] = true;
        projectilesToSend.push({
            position: bullet.position,
            force: force,
        });
        bullet.time = 0;
        projectiles.push(bullet);
    }
    sendMessage({data: {projectiles: projectilesToSend}});
    mouseTimer = 0;
}

function addProjectile(proj) {
    let bullet = Bodies.circle(proj.position.x, proj.position.y, 3);
    Composite.add(engine.world, bullet,{ isStatic: true });
    Body.applyForce(bullet,bullet.position,proj.force);
    bullet[id] = false;
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
        Body.applyForce(players[enemyID],players[enemyID].position, force);
    } else {
        if (spawned) Composite.remove(engine.world, players[enemyID]);
        players[enemyID] = createPlayerAvatar(pos, spawned);
        Body.applyForce(players[enemyID],players[enemyID].position, force);
    }
}

function createPlayerAvatar(pos, spawned) {
    console.log('creating');
    let enemy = Bodies.circle(pos.x,pos.y,10);
    Composite.add(engine.world, enemy)
    return enemy;
}