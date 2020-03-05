var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Constraint = Matter.Constraint, Body = Matter.Body, Composite = Matter.Composite;

var engine, world, ground, car, terrainMap;

var mill, font, txtSpd;

function preload() {
    font = loadFont("Roboto-Light.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    Engine.run(engine);

    world = engine.world;

    car = new Car(parseInt(random(1, 6)));
    terrain = new Terrain();

    ground = Bodies.rectangle(width*5/2 - 50, height, width * 5, 40, {isStatic: true});
    World.add(world, ground);

    mill = 0;
    terrainMap = [];
}

function draw() {
    background(49, 219, 222);
    noStroke();
    rectMode(CENTER);
    textFont(font);
    textSize(32);
    fill(255);
    text("Speed: " + txtSpd, 10, 32);
    text("Target: " + car.speed, 10, 75);

    translate(-car.chasis.position.x + car.w + 100, 0);

    //ground
    fill(58, 201, 63);
    rect(ground.position.x, ground.position.y, width*5, 40);

    //terrain
    for(var t of terrainMap) {
        t.show();
    }

    //car
    car.show();
    if(millis() - mill >= 300) {
        txtSpd = nf(car.chasis.speed, nf(parseInt(car.chasis.speed)).length, 2);
        car.update();
        mill = millis();
    }
}

function mousePressed() {
    terrainMap.push(new Terrain(mouseX + car.chasis.position.x - car.w - 100, mouseY, 200, 50, 1));
}

function keyPressed() {
    for(var t of terrainMap) {
        Composite.remove(world, t.body);
    }
    terrainMap = [];
} 