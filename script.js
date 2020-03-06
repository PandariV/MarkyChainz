var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Constraint = Matter.Constraint, Body = Matter.Body;

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

    ground = Bodies.rectangle(width/2 - 50, height, width, 80, {isStatic: true});
    World.add(world, ground);

    for(var i  = 0; i < 1; i++) {
        terr.push(new Terrain(random(500, 1000), random(50, 150), .5));
    }
    mill = 0;
    console.log(car.chasis);
}

function draw() {
    background(49, 219, 222);
    frameRate(60);
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
    Body.translate(ground, {x: (car.chasis.position.x + car.w*2 + 67) - ground.position.x, y: 0});
    rect(ground.position.x, ground.position.y, width, 80);

    //terrain
    for(var i = terr.length - 1; i >=0; i--) {
        terr[i].show();
        if(car.chasis.position.x > (terr[i].body.position.x + terr[i].w + 100)) {
            World.remove(world, terr[i].body);
            terr.splice(i, 1);
            terr.push(new Terrain(random(500, 1000), random(50, 150), .5));
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

function keyPressed() {
    setup();
}