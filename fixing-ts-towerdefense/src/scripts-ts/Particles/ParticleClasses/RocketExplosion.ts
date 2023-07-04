import { ParticleSystem } from "../Contracts/ParticleSystemBase";
import { Fire } from "./Fire";
export class RocketExplosion extends ParticleSystem{
    x: number;
    y: number;
    constructor(x:number, y:number) {
        super(x , y)
        this.x = x;
        this.y = y;
    }
    addParticle(): void {
        this.particles.push(new Fire(this.origin, 5));
    }
}