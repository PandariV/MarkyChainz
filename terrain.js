class Terrain {
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, w, h);
        World.add(world, this.body);
    }

    show() {
        fill(84, 69, 27);
        stroke(0, 255, 0);
        strokeWeight(10);

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        rect(0, 0, this.w, this.h);
        pop();
        noStroke();
    }
}