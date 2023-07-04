import { ParticleSystem } from "../Contracts/ParticleSystemBase";
import { Bomb } from "./Bomb";
export class BombExplosion extends ParticleSystem{
    x: number;
    y: number;
    constructor(x:number, y:number){
        super(x,y);
            this.x = x;
            this.y = y;
    }
    addParticle(): void {
        this.particles.push(new Bomb(this.origin, 2));
    }

}