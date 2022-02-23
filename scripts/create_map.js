
function createMap(width, height) {
    let entities = [];
    let ground = Bodies.rectangle(width - width / 2, height, width, 100, { isStatic: true });
    entities.push(Bodies.rectangle(0, height - height / 2, 100, height, { isStatic: true }));
    entities.push(Bodies.rectangle(width, height - height / 2, 100, height, { isStatic: true }));
    entities.push(Bodies.rectangle(0 + width / 2, 0, width, 100, { isStatic: true }));
    entities.push(Bodies.rectangle(0, 300, width / 3, 60, { isStatic: true }));
    ground.label = 'ground';
    entities.push(ground);
    entities.map((e) => {
        e.bodyType = 'rect';
        e.label = 'structure';
    });
    return entities;
}

function createRandomMap(width, height) {
    let colors = ['#E56399','#7F96FF','#DC2E76','#E46298'];
    let entities = [];
    let ground = Bodies.rectangle(width - width / 2, height, width, 50, { isStatic: true });
    ground.color = colors[Math.floor(colors.length * Math.random())];
    entities.push(Bodies.rectangle(0, height - height / 2, 50, height, { isStatic: true }));
    entities.push(Bodies.rectangle(width, height - height / 2, 50, height, { isStatic: true }));
    entities.push(Bodies.rectangle(0 + width / 2, 0, width, 50, { isStatic: true }));
    for (let i = 0; i < 5; i++ ) {
        let x = width * Math.random();
        let y = height * Math.random();
        const body = Bodies.rectangle(x, i * (height / 5) + (height / 5), width / 3, 50, { isStatic: true });
        body.color = colors[Math.floor(colors.length * Math.random())];
        entities.push(body);
    }
    
    ground.label = 'ground';
    entities.push(ground);
    entities.map((e) => {
        e.bodyType = 'rect';
        e.label = 'structure';
    });
    return entities;
}