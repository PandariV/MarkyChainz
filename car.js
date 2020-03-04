class Car {
    constructor(x, y, r, speed) {
        this.speed = speed;
        this.wheel = Bodies.circle(x, y, r);
        World.add(world, this.wheel);
    }

    show() {
        fill(255);
        
        push();
        ellipse(this.wheel.position.x, this.wheel.position.y, this.wheel.circleRadius * 2, this.wheel.circleRadius * 2);
        pop();
    }

    update() {
        this.wheel.angle += this.speed;
    }
}