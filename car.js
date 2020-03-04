class Car {
    constructor(x, y, w, h, r, speed) {
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.chasis = Bodies.rectangle(x, y, w, h);
        this.wheel1 = Bodies.circle(x-w/2, y+r*2, r);
        this.wheel2 = Bodies.circle(x+w/2, y+r*2, r);
        this.constraint1 = Constraint.create({bodyA: this.chasis, bodyB: this.wheel1, length: 100, stiffness: 1.5});
        this.constraint2 = Constraint.create({bodyA: this.chasis, bodyB: this.wheel2, length: 100, stiffness: 1.5});
        World.add(world, [this.chasis, this.wheel1, this.wheel2, this.constraint1, this.constraint2]);
    }

    show() {
        fill(0);
        ellipse(this.wheel1.position.x, this.wheel1.position.y, this.wheel1.circleRadius * 2, this.wheel1.circleRadius * 2);
        ellipse(this.wheel2.position.x, this.wheel2.position.y, this.wheel2.circleRadius * 2, this.wheel2.circleRadius * 2);

        push();
        fill(194, 41, 51);
        translate(this.chasis.position.x, this.chasis.position.y);
        rotate(this.chasis.angle);
        rect(0, this.h/8, this.w, this.h + this.h/4);
        pop();
    }

    update() {
        this.wheel1.angle += this.speed;
        this.wheel2.angle = this.wheel1.angle;
    }
}