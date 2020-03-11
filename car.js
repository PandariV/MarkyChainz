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

        this.force = 0;
        this.markov = [0, 0, 0, 0, 0];
        this.counter = 0;

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
        fill(132, 170, 173);
        translate(this.axis.position.x, this.axis.position.y);
        rotate(this.chasis.angle);
        rect(0, -this.h, this.w*2, this.h)
        fill(149, 181, 184);
        rect(0, 0, this.w, this.h)
        pop();

        push();
        fill(132, 170, 173);
        translate(this.chasis.position.x, this.chasis.position.y);
        rotate(this.chasis.angle);
        beginShape();
        vertex(-this.w, -this.h/2);
        vertex(50, -this.h*1.5);
        vertex(this.w, -this.h/2);
        endShape(CLOSE);
        pop();
    }

    update() {
        var angle = this.chasis.angle;

        if(this.counter < 100) {
            this.counter++;
            this.force += (this.chasis.speed > this.speed) && (this.force > 0) ? -0.1 : 0.1;
            if(this.force < .2) {
                this.markov[0]++;
            } else if(this.force < .4) {
                this.markov[1]++;
            } else if(this.force < .6) {
                this.markov[2]++;
            } else if(this.force < .8) {
                this.markov[3]++;
            } else {
                this.markov[4]++;
            }
        } else {
            training = false;

            var max = this.markov[0];
            var maxIndex = 0;

            for (var i = 1; i < this.markov.length; i++) {
                if (this.markov[i] > max) {
                    maxIndex = i;
                    max = this.markov[i];
                }
            }

            var upRange = (.2 * maxIndex) + .2;
            var lowRange = upRange - .2;
            this.force += (this.chasis.speed > this.speed) && (this.force > lowRange) ? -0.05 : (this.chasis.speed < this.speed) && (this.force < upRange) ? 0.05 : 0;
        }

        Body.applyForce(this.chasis, this.chasis.position, {x: cos(angle)*this.force, y: sin(angle)*this.force});
    }
}