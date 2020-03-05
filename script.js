var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Constraint = Matter.Constraint, Body = Matter.Body, Composite = Matter.Composite;

var engine, world, ground, car;
var terrainMap = [];

var mill = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    Engine.run(engine);

    world = engine.world;
    ground = Bodies.rectangle(width*100/2, height, width * 100, 40, {isStatic: true});
    World.add(world, ground);

    car = new Car(1);

}

function mousePressed() {
    terrainMap.push(new Terrain(mouseX, mouseY, 50, 50));
}

function keyPressed() {
    for(var t of terrainMap) {
        Composite.remove(world, t.body);
    }
    terrainMap = [];
}

function draw() {
    background(49, 219, 222);
    noStroke();
    rectMode(CENTER);

    //car
    car.show();
    if(millis() - mill >= 500) {
        car.update();
        console.log(car.chasis.speed);
        mill = millis();
    }
    
    //ground
    fill(0, 255, 0);
    rect(ground.position.x, ground.position.y, width, 40);

    //obstacles
    for(var t of terrainMap) {
        t.show();
    }
}