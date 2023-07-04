import { ParticleSystem } from "../Contracts/ParticleSystemBase"
import { BombExplosion } from "../ParticleClasses/BombExplosion"
import { SharpnelExplosion } from "../ParticleClasses/SharpnelExplosion"
import { RocketExplosion } from "../ParticleClasses/RocketExplosion"
export function createParticle(x:number, y:number, ParticleName:string){
    var particles: ParticleSystem
    switch(ParticleName) {
        case "bombExplosion": {
            particles = new BombExplosion(x, y)
            break
        }
        case "RocketExplosion": {
            particles = new RocketExplosion(x, y)
            break
        }
        case "SharpnelExplosion": {
            particles = new SharpnelExplosion(x, y)
            break
        }
        default: {
            particles = new BombExplosion(x, y)
            break
        }
    }
    return particles
}