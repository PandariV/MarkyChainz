function Obstacle(x, y, width, height) {
    this.body = Bodies.rectangle(x, y, width, height);
    World.add(world, this.body);

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rect(0, 0, width, height);
        pop();
    }
}