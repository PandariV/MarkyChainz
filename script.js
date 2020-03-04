var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;

var engine, world, ground, car;
var obstacles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    Engine.run(engine);

    world = engine.world;
    ground = Bodies.rectangle(width/2, height, width, 20, {isStatic: true});
    World.add(world, ground);

    car = new Car(250, 250, 50, .001);
}

function mousePressed() {
    obstacles.push(new Obstacle(mouseX, mouseY, 50, 50));
}

function draw() {
    background(0);
    frameRate(60);
    noStroke();
    rectMode(CENTER);
    
    //ground
    fill(0, 255, 0);
    rect(ground.position.x, ground.position.y, width, 20);

    //obstacles
    for(var o of obstacles) {
        o.show();
    }

    //car
    car.show();
    car.update();
}