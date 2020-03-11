class Terrain {
    constructor(difficulty, x) {
        this.difficulty = difficulty;
        this.coordinates = [];
        this.vertices = [];

        this.x = x;
        this.y = height - 40;

        this.coordinates.push([this.x, this.y]);

        for (var i = 0; i <= 1000; i+=5) {
            var temp = noise(i*this.difficulty, car.chasis.position.x*this.difficulty);
            this.coordinates.push([this.x + i,  height - temp*500]);;
        }
        this.coordinates.push([this.x+1000, this.y]);

        for(var i = 0; i < 40; i++) {
            this.coordinates[i][1] = this.y - i*((this.y - this.coordinates[40][1])/40);
        }

        for(var i = this.coordinates.length - 40; i < this.coordinates.length; i++) {
            this.coordinates[i][1] = this.coordinates[i][1] + (i-(this.coordinates.length - 40))*((this.y - this.coordinates[this.coordinates.length - 41][1])/40);
        }

        for (var i = 0; i < this.coordinates.length; i++) {
            this.vertices.push(Vector.create(this.coordinates[i][0], this.coordinates[i][1]));
        }
        
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
}