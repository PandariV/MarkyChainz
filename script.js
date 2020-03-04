var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Constraint = Matter.Constraint, Body = Matter.Body;

var engine, world, ground, car;
var obstacles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    Engine.run(engine);

    world = engine.world;
    ground = Bodies.rectangle(width/2, height, width, 40, {isStatic: true});
    World.add(world, ground);

    car = new Car(.01);
}

function mousePressed() {
    obstacles.push(new Obstacle(mouseX, mouseY, 50, 50));
}

function draw() {
    background(49, 219, 222);
    frameRate(60);
    noStroke();
    rectMode(CENTER);

    //car
    car.show();
    car.update();
    
    //ground
    fill(0, 255, 0);
    rect(ground.position.x, ground.position.y, width, 40);

    //obstacles
    for(var o of obstacles) {
        o.show();
    }
}