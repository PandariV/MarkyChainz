class Car {
    constructor(x, y, w, h, r, speed) {
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.chasis = Bodies.rectangle(x, y, w, h);
        this.wheel1 = Bodies.circle(x-w/2, y+h, r);
        this.wheel2 = Bodies.circle(x+w/2, y+h, r);
        this.constraint1 = Constraint.create({bodyA: this.chasis, bodyB: this.wheel1, length: 100, stiffness: .7});
        this.constraint2 = Constraint.create({bodyA: this.chasis, bodyB: this.wheel2, length: 100, stiffness: .7});
        World.add(world, [this.chasis, this.wheel1, this.wheel2, this.constraint1, this.constraint2]);
    }

    show() {
        fill(255);
        
        push();
        fill(194, 41, 51);
        rect(this.chasis.position.x, this.chasis.position.y, this.w, this.h);
        fill(0);
        ellipse(this.wheel1.position.x, this.wheel1.position.y, this.wheel1.circleRadius * 2, this.wheel1.circleRadius * 2);
        ellipse(this.wheel2.position.x, this.wheel2.position.y, this.wheel2.circleRadius * 2, this.wheel2.circleRadius * 2);
        pop();
    }

    update() {
        this.wheel1.angle += this.speed;
        this.wheel2.angle = this.wheel1.angle;
    }
}