
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
