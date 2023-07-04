import { Vector } from "p5";
import { myp5 } from "../../sketch";
import { Particle } from "./Particles";
export abstract class ParticleSystem{
    origin:Vector;
    particles:Array<Particle>;
    constructor(x:number, y:number){
        this.origin = myp5.createVector(x, y);
        this.particles = [];
    }

    addParticle() {
        this.particles.push(new Particle(this.origin, 1))
    }

    isDead() {
        return this.particles.length === 0;
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();

            if (p.isDead()) this.particles.splice(i, 1);
        }
    }
}