var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine, world, boxy;

function setup() {
    createCanvas(500, 500);
    engine = Engine.create();
    world = engine.world;
    boxy = Bodies.rectangle(69, 69, 69, 69);
    Engine.run(engine);
}

function draw() {
    background(51);
    rect(boxy.position.x, boxy.position.y, 69, 69)
}