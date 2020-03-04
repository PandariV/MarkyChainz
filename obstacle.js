class Obstacle {
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, w, h);
        World.add(world, this.body);
    }

    show() {
        fill(255);
        
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rect(0, 0, this.w, this.h);
        pop();
    }
}