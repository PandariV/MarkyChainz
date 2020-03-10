class Terrain {
    constructor(difficulty) {
        this.difficulty = difficulty;
        this.coordinates = [];
        this.vertices = [];

        this.x = car.chasis.position.x + width;
        this.y = height - 40;

        this.coordinates.push([this.x, this.y]);

        for (var i = 100; i < 1000; i+=100) {
            var temp = noise(i, car.chasis.position.x, random(100));
            this.coordinates.push([this.x + i,  height - temp*100 - 40]);;
        }
        this.coordinates.push([this.x+1000, this.y]);

        for (var i = 0; i < this.coordinates.length; i++) {
            this.vertices.push(Matter.Vector.create(this.coordinates[i][0], this.coordinates[i][1]));
        }

        this.actualVertices = Matter.Vertices.create(this.vertices);
        
        this.body = Bodies.fromVertices(this.x, this.y, this.vertices, {isStatic: true});

        // this.highestY = -10000;
        // this.lowestY = 10000;
        // this.highestX = -10000;
        // this.lowestX = 10000;

        // for (var i of this.vertices) {
        //     this.highestY = Math.max(this.highestY, i.y);t
        //     this.lowestY = Math.min(this.lowestY, i.y);
        //     this.highestX = Math.max(this.highestX, i.x)
        //     this.lowestX = Math.min(this.lowestX, i.x);
        // }

        Body.translate(this.body, {x: 0, y: -20})

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