import { ParticleSystem } from "../Contracts/ParticleSystemBase";
import { Shrapnel } from "./Shrapnel";
export class SharpnelExplosion extends ParticleSystem {
    x: number;
    y: number;
    constructor(x:number, y:number){
        super(x, y);
        this.x = x;
        this.y = y;
    }
    addParticle() {
        this.particles.push(new Shrapnel(this.origin, 5));
    }
}