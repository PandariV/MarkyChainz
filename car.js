class Car {
    constructor(speed) {
        this.speed = speed;
        this.x = 250;
        this.y = 250;
        this.w = 200;
        this.h = 80;
        this.r = 30;
        this.chasis = Bodies.rectangle(this.x, this.y, this.w, this.h);
        this.axis = Bodies.rectangle(this.x, this.y, this.w, this.h);
        this.wheel1 = Bodies.circle(this.x-this.w/2, this.y+this.r*2, this.r);
        this.wheel2 = Bodies.circle(this.x+this.w/2, this.y+this.r*2, this.r);
        this.constraint1 = Constraint.create({bodyA: this.chasis, bodyB: this.wheel1, length: 100, stiffness: 1.7});
        this.constraint2 = Constraint.create({bodyA: this.chasis, bodyB: this.wheel2, length: 100, stiffness: 1.7});
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
        //rect(0, this.h/8, this.w, this.h + this.h/4);
        rect(0, 0, this.w, this.h)
        pop();
    }

    update() {
        this.wheel1.angle += this.speed;
        this.wheel2.angle = this.wheel1.angle;
    }
}