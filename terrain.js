class Terrain {
    constructor(difficulty, x) {
        this.difficulty = difficulty;
        this.coordinates = [];
        this.vertices = [];

        this.x = x;
        this.y = height - 40;

        this.coordinates.push([this.x, this.y]);

        // // giorgi's witchcraft
        // for (var i = 0; i <= width*1.5; i+=5) {
        //     var temp = noise(i*this.difficulty, car.chasis.position.x*this.difficulty);
        //     if(i < 50) {
        //         this.coordinates.push([this.x + i, height - (temp*500)*(i/50)]);
        //     } //else if (i > 50 && i < width*1.5 - 50) {
        //     else  this.coordinates.push([this.x + i,  height - temp*500]);
        //     //} else {
        //         //this.coordinates.push([this.x + i, height - (temp*500*i/50)]
        //     //}
        // }

        for (var i = 0; i <= width*1.5; i+=5) {
            var temp = noise(i*this.difficulty, car.chasis.position.x*this.difficulty);
            this.coordinates.push([this.x + i,  height - temp*500]);;
        }
        this.coordinates.push([this.x+width*1.5, this.y]);

        for(var i = 0; i < 60; i++) {
            this.coordinates[i][1] = this.y - i*((this.y - this.coordinates[60][1])/60);
        }

        for(var i = this.coordinates.length - 60; i < this.coordinates.length; i++) {
            this.coordinates[i][1] = this.coordinates[i][1] + (i-(this.coordinates.length - 60))*((this.y-25 - this.coordinates[this.coordinates.length - 61][1])/60);
        }

        for (var i = 0; i < this.coordinates.length; i++) {
            if(this.coordinates[i][0] != null) {
                this.vertices.push(Vector.create(this.coordinates[i][0], this.coordinates[i][1]));
            }
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