var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Constraint = Matter.Constraint, Body = Matter.Body, Vertices = Matter.Vertices, Vector = Matter.Vector;

var engine, world, ground, car, terr;

var mill, font, txtSpd, training;

function preload() {
    font = loadFont("Roboto-Light.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();

    world = engine.world;

    car = new Car(5);

    ground = Bodies.rectangle(width/2 - 50, height, width, 80, {isStatic: true});
    World.add(world, ground);   

    terr = [];
    terr.push(new Terrain(.002, width/2));
    mill = 0;
    training = true;
}

function draw() {
    background(49, 219, 222);
    frameRate(60);
    Engine.update(engine);
    noStroke();
    rectMode(CENTER);
    textFont(font);
    textSize(32);
    fill(255);
    text("Speed: " + txtSpd, 10, 32);
    text("Target: " + car.speed, 10, 75);
    if(training) {
        fill(255, 0, 0);
        text("The AI is training: " + (100 - car.counter)/10 + " seconds remaining...", width - textWidth("The AI is training: " + "100" + " seconds remaining...") - 20, 32);
    } else {
        fill(0, 255, 0);
        text("The AI is enabled", width - textWidth("The AI is enabled") - 20, 32);
    }

    //ground
    fill(58, 201, 63);
    Body.translate(ground, {x: (car.chasis.position.x) - ground.position.x, y: 0});
    rect(width/2, height, width, 80);

    translate(-car.chasis.position.x + car.w + 100, 0);

    //terrain
    for(var i = terr.length - 1; i >=0; i--) {
        terr[i].show();
        if((car.chasis.position.x - car.w - 100) > (terr[i].body.vertices[terr[i].body.vertices.length-1].x)) {
            World.remove(world, terr[i].body);
            terr.splice(i, 1);
            i--;
            terr.push(new Terrain(.002, car.chasis.position.x + width*1.4));
        }
    }

    //car
    car.show();
    if(millis() - mill >= 250) {
        txtSpd = nf(car.chasis.speed, nf(parseInt(car.chasis.speed)).length, 2);
        car.update();
        mill = millis();
    }
}