class Terrain {
    constructor(w, h, s) {
        this.w = w;
        this.h = h;
        this.s = s;
        this.x = car.chasis.position.x + width;
        this.y = height - this.h/2 - 20;
        this.body = Bodies.trapezoid(this.x, this.y, w, h, s, {isStatic: true});
        World.add(world, this.body);
    }

    show() {
        fill(58, 201, 63);

        push();
        translate(this.body.position.x, this.body.position.y - this.h/16);
        rotate(this.body.angle);
        beginShape();
        vertex(-this.w/2, this.h/2);
        vertex(-this.w/4, -this.h/2);
        vertex(this.w/4, -this.h/2);
        vertex(this.w/2, this.h/2);
        endShape(CLOSE);
        pop();
    }
}