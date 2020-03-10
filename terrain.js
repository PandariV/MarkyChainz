class Terrain {
    constructor(difficulty, lastPt) {
        this.difficulty = difficulty;
        this.lastPt = lastPt;
        this.coordinates = [];
        this.vertices = [];

        this.x = car.chasis.position.x;
        this.y = height - 40;

        this.coordinates.push([this.x, this.y]);

        for (var i = 0; i <= 1000; i+=5) {
            var temp = noise(i*this.difficulty, car.chasis.position.x*this.difficulty);
            this.coordinates.push([this.x + i + lastPt[0],  height - temp*500 - lastPt[1]]);;
        }
        this.coordinates.push([this.x+1000, this.y]);

        for (var i = 0; i < this.coordinates.length; i++) {
            this.vertices.push(Matter.Vector.create(this.coordinates[i][0], this.coordinates[i][1]));
        }

        this.actualVertices = Matter.Vertices.create(this.vertices);
        
        this.body = Bodies.fromVertices(this.x, this.y, this.vertices, {isStatic: true});

        Body.translate(this.body, {x: 0, y: -10})

        World.add(world, this.body);
    }

    show() {
        fill(58, 201, 63);

        push();
        translate(this.body.vertices[1].x - this.vertices[0].x, this.body.vertices[1].y - this.vertices[0].y);
        rotate(this.body.angle);
        beginShape();
        for(var i = 0; i < this.coordinates.length; i++) {
            vertex(this.coordinates[i][0], this.coordinates[i][1]);
        }
        endShape(CLOSE);
        pop();
    }

    lastPoint() {
        return [this.coordinates[this.coordinates.length-1][0], this.coordinates[this.coordinates.length-1][1]];
    }
}