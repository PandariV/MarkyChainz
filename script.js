var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Constraint = Matter.Constraint, Body = Matter.Body, Composite = Matter.Composite;

var engine, world, ground, car, terr = [];

var mill, font, txtSpd;

function preload() {
    font = loadFont("Roboto-Light.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    Engine.run(engine);

    world = engine.world;

    car = new Car(parseInt(random(5, 11)));
    terrain = new Terrain();

    ground = Bodies.rectangle(width*10/2 - 50, height, width * 10, 40, {isStatic: true});
    World.add(world, ground);

    for(var i  = 0; i < 1; i++) {
        terr.push(new Terrain(200, 50, 1));
    }
    mill = 0;
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
    rect(ground.position.x, ground.position.y, width*10, 40);

    //terrain
    for(var i = terr.length - 1; i >=0; i--) {
        terr[i].show();
        if(car.chasis.position.x > (terr[i].body.position.x + car.w*2 + 100)) {
            terr.splice(i, 1);
            terr.push(new Terrain(random(500, 1000), random(50, 150), 1));
            i--;
        }
    }

    //car
    car.show();
    if(millis() - mill >= 100) {
        txtSpd = nf(car.chasis.speed, nf(parseInt(car.chasis.speed)).length, 2);
        car.update();
        mill = millis();
    }
}