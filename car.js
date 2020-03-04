class Car {
    constructor(speed) {
        this.speed = speed;
        this.x = 250;
        this.y = 400;
        this.w = 200;
        this.h = 40;
        this.r = 30;
        this.chasis = Bodies.rectangle(this.x, this.y-this.h*2, this.w*2, this.h);
        this.axis = Bodies.rectangle(this.x, this.y, this.w, this.h);
        this.wheel1 = Bodies.circle(this.x-this.w/2-this.r, this.y, this.r);
        this.wheel2 = Bodies.circle(this.x+this.w/2+this.r, this.y, this.r);

        var constraints = [];
        constraints.push(Constraint.create({bodyA: this.axis, bodyB: this.wheel1, length: this.w/2+this.r+10, stiffness: 1}));
        constraints.push(Constraint.create({bodyA: this.axis, bodyB: this.wheel2, length: this.w/2+this.r+10, stiffness: 1}));
        constraints.push(Constraint.create({bodyA: this.wheel1, bodyB: this.wheel2, length: this.w+(this.r+10)*2, stiffness: 1}));
        constraints.push(Constraint.create({bodyA: this.chasis, bodyB: this.wheel1, length: sqrt(pow(this.w/2+this.r+10, 2) + pow(this.h, 2)), stiffness: 1}));
        constraints.push(Constraint.create({bodyA: this.chasis, bodyB: this.wheel1, length: sqrt(pow(this.w/2+this.r+10, 2) + pow(this.h, 2)), stiffness: 1}));
        constraints.push(Constraint.create({bodyA: this.chasis, bodyB: this.axis, length: this.h, stiffness: 1}));

        for(var c of constraints) {
            World.add(world, c);
        }
        World.add(world, [this.chasis, this.axis, this.wheel1, this.wheel2]);
    }

    show() {
        fill(0);
        ellipse(this.wheel1.position.x, this.wheel1.position.y, this.wheel1.circleRadius * 2, this.wheel1.circleRadius * 2);
        ellipse(this.wheel2.position.x, this.wheel2.position.y, this.wheel2.circleRadius * 2, this.wheel2.circleRadius * 2);

        push();
        fill(194, 41, 51);
        translate(this.axis.position.x, this.axis.position.y);
        rotate(this.chasis.angle);
        rect(0, -this.h, this.w*2, this.h)
        rect(0, 0, this.w, this.h)
        pop();
    }

    update() {
        this.wheel1.angle += this.speed;
        this.wheel2.angle = this.wheel1.angle;
    }
}