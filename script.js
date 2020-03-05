var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Constraint = Matter.Constraint, Body = Matter.Body, Composite = Matter.Composite;

var engine, world, ground, car;
var terrainMap = [];

var mill = 0;

var font, txtSpd;

function preload() {
    font = loadFont("Roboto-Light.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    Engine.run(engine);

    world = engine.world;
    ground = Bodies.rectangle(width*5/2 - 50, height, width * 5, 40, {isStatic: true});
    World.add(world, ground);

    car = new Car(1);
    txtSpd = car.chasis.speed;
}

function draw() {
    background(49, 219, 222);
    noStroke();
    rectMode(CENTER);
    textFont(font);
    textSize(32);
    fill(255);
    text("Speed: " + txtSpd, 10, 32);

    translate(-car.chasis.position.x + car.w + 100, 0);

    //car
    car.show();
    if(millis() - mill >= 500) {
        txtSpd = nf(car.chasis.speed, 2, 2);
        car.update();
        console.log(car.chasis.speed);
        mill = millis();
    }

    //ground
    fill(0, 255, 0);
    rect(ground.position.x, ground.position.y, width*5, 40);

    //obstacles
    for(var t of terrainMap) {
        t.show();
    }
}

function mousePressed() {
    terrainMap.push(new Terrain(mouseX + car.chasis.position.x - car.w - 100, mouseY, 50, 50));
}

function keyPressed() {
    for(var t of terrainMap) {
        Composite.remove(world, t.body);
    }
    terrainMap = [];
}