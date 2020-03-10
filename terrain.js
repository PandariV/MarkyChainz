class Terrain {
    constructor(difficulty) {
        this.difficulty = difficulty;
        this.coordinates = [];
        this.vertices = [];

        this.x = car.chasis.position.x + width;
        this.y = height - 40;

        this.coordinates.push([this.x, this.y]);
        //this.vertices.push(Matter.Vector.create(this.x, this.y));

        for (var i = 100; i < 1000; i+=100) {
            var temp = noise(i, car.chasis.position.x, random(100));
            this.coordinates.push([this.x + i,  height - temp*100 - 40]);
            //this.vertices.push(Matter.Vector.create(this.x + i + 500,  height - temp*100 - 40));
        }
        this.coordinates.push([this.x+1000, this.y]);
        //this.coordinates.push(Matter.Vector.create(this.x+1000, this.y));

        for (var i = 0; i < this.coordinates.length; i++) {
            this.vertices.push(Matter.Vector.create(this.coordinates[i][0], this.coordinates[i][1]));
        }

        this.actualVertices = Matter.Vertices.create(this.vertices);
        
        this.body = Bodies.fromVertices(this.x, this.y, this.vertices, {isStatic: true});

        var center = Matter.Vertices.centre(this.body.vertices);
        //console.log(center);
        console.log(this.body);
        // console.log(this.vertices[0].y - center.y);
        console.log(this.vertices[0]);

        var highestY = 0;
        var lowestY = 10000;
        var highestX = 0;
        var lowestX = 10000;

        for (var i of this.vertices) {
            highestY = Math.max(highestY, i.y);
            lowestY = Math.min(lowestY, i.y);
            highestX = Math.max(highestX, i.x);
            lowestX = Math.min(lowestX, i.x);
        }
        //console.log(highest-lowest);
        Body.translate(this.body, {x: (highestX-lowestX)/2, y: (lowestY-highestY)/2});

        World.add(world, this.body);

        // for(var i = 0; i < this.coordinates.length; i++) {
        //     console.log("x: " + this.coordinates[i][0] + " | y: " + this.coordinates[i][1]);
        // }
        // for(var i = 0; i < this.vertices.length; i++) {
        //     //console.log(this.vertices);
        //     var v = this.vertices[i];
        //     console.log("vector x: " + v.x + " | vector y: " + v.y);
        // }
    }

    show() {
        fill(255);

        push();
        rotate(this.body.angle);
        beginShape();
        for(var i = 0; i < this.coordinates.length; i++) {
            vertex(this.coordinates[i][0], this.coordinates[i][1]);
        }
        endShape(CLOSE);
        var center = Matter.Vertices.centre(this.body.vertices);
        translate(center.x, center.y);
        fill(255, 0, 0);
        rect(0, 0, 10, 10);
        pop();

            // for (let x = 0; x < width; x++) {
            //     let noiseVal = noise((x) * .01);
            //     stroke(58, 201, 63);
            //     line(x, noiseVal * 80 + height/2, x, height);
            // }
    }
}