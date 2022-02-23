
const ctx = canvas.getContext('2d');

const shapeMap = {
    'circle' : drawCircle,
    'rect' : drawRect,
}
const colorMap = {
    'friendly' : '#EF7B45',
    'enemy' : 'red',
    'structure': '#5EB1BF',
    'other': '#D84727'
}

function renderFrame(bodies, stroke) {
    ctx.beginPath();
    for (let i = 0; i < bodies.length; i++) {
        shapeMap[bodies[i].bodyType]
            (bodies[i], colorMap[bodies[i].label], stroke);
    }
    ctx.closePath();
}

function clearCanvas() {
    ctx.fillStyle = "#CDEDF6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(body, color, stroke) {
    ctx.beginPath();
    const {position, circleRadius} = body;
    ctx.moveTo(position.x, position.y);
    ctx.arc(position.x, position.y, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke || color;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function drawRect(body, color) {
    const {vertices} = body;
    const x1 = vertices[0].x;
    const y1 = vertices[0].y;
    const x2 = vertices[2].x;
    const y2 = vertices[2].y;
    ctx.moveTo(x1, y1);
    ctx.rect(x1, y1, x2-x1, y2-y1);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();
    ctx.stroke();
}