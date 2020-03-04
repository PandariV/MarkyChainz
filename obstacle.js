class Obstacle {
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, w, h);
        World.add(world, this.body);
    }

    show() {
        fill(255);

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rect(0, 0, this.w, this.h);
        pop();
    }
}