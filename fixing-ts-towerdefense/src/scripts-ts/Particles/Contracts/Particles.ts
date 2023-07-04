import { Vector } from "p5";
import { myp5, paused } from "../../sketch";
import { ts } from "../../sketch";
export class Particle{
    pos:Vector;
    vel:Vector;
    lifespan:number;
    decay:number;
    color: number[];
    radius: number;
    constructor(pos:Vector, speed:number){
        this.pos = pos.copy();
        this.vel = Vector.random2D().mult(myp5.random(-1, 1) * speed * ts / 24);
        this.lifespan = 255;
        this.decay = 2;
        this.color = [0, 0, 0];
        this.radius = 4;
    }

    draw() {
        myp5.stroke(0, this.lifespan);
        myp5.fill(this.color[0], this.color[1], this.color[2], this.lifespan);
        var r = this.radius * ts / 24 * 2;
        myp5.ellipse(this.pos.x, this.pos.y, r, r);
    }

    isDead() {
        return this.lifespan < 0;
    }

    run() {
        if (!paused) this.update();
        this.draw();
    }

    update() {
        this.pos.add(this.vel);
        this.lifespan -= this.decay;
    }
}