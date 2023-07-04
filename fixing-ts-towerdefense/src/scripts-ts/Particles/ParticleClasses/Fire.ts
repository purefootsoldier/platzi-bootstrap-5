import { Vector } from "p5";
import { Particle } from "../Contracts/Particles";
import { myp5, ts } from "../../sketch";
import * as utilities from "../../utils"
export class Fire extends Particle{
    angle: number;
    angVel: number;
    constructor( pos: Vector, speed: number) {
        super( pos, speed);
        this.angle = myp5.random(myp5.TWO_PI);
        this.angVel = myp5.random(-1, 1);
        this.decay = myp5.random(3, 6);
        this.color = [200 + myp5.random(55),myp5.random(127), myp5.random(31)];
        this.radius = utilities.randint(2, 6);
    }

    draw() {
        myp5.stroke(0, this.lifespan);
        myp5.fill(this.color[0], this.color[1], this.color[2], this.lifespan);
        myp5.rectMode(myp5.CENTER);
        myp5.push();
        myp5.translate(this.pos.x, this.pos.y);
        myp5.rotate(this.angle);
        var r = this.radius * ts / 24 * 2;
        myp5.rect(0, 0, r, r);
        myp5.pop();
        myp5.rectMode(myp5.CORNER);
    }

    update() {
        this.pos.add(this.vel);
        this.angle += this.angVel;
        this.lifespan -= this.decay;
    }
}