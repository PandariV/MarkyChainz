var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;

var engine, world, ground;
var obstacles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    Engine.run(engine);

    world = engine.world;
    ground = Bodies.rectangle(width/2, height, width, 20, {isStatic: true});
    World.add(world, ground);
}

function mousePressed() {
    obstacles.push(new Obstacle(mouseX, mouseY, 50, 50));
}

function draw() {
    background(0);
    noStroke();
    rectMode(CENTER);
    
    fill(0, 255, 0);
    rect(ground.position.x, ground.position.y, width, 20);

    fill(255);
    for(var o of obstacles) {
        o.show();
    }
}