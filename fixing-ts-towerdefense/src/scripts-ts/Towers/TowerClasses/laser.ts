import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
import { myp5 } from "../../sketch";
import { Tower } from "../Contracts/TowerBase";

export class laser extends Tower {
    // Display
    color:Array<number> = [25, 181, 254]
    length:number = 0.55
    radius:number = 0.8
    secondary:Array<number> = [149, 165, 166]
    width:number = 0.25
    // Misc
    name:string = 'laser'
    title:string = 'Laser Tower'
    // Stats
    cooldownMax:number = 1
    totalCost:number = 75
    damageMax:number = 3
    range:number = 2
    type:string = 'energy'
    // Upgrades
    upgrades: Array<any> = [
        {
            // Display
            color: [78, 205, 196],
            length: 0.65,
            radius: 0.9,
            secondary: [191, 191, 191],
            weight: 3,
            width: 0.35,
            // Misc
            name: 'beamEmitter',
            title: 'Beam Emitter',
            // Stats
            cooldownMax: 0,
            totalCost: 200,
            damageMax: 0.1,
            damageMin: 0.001,
            range: 3,
            // Methods
            attack: function(e: EnemyBase) {
                if (this.lastTarget === e) {
                    this.duration++;
                } else {
                    this.lastTarget = e;
                    this.duration = 0;
                }
                //var damage = this.damageMin * pow(2, this.duration);
                var d = myp5.random(this.damageMin, this.damageMax);
                var damage = d * myp5.sq(this.duration);
                e.dealDamage(damage, this.type);
                this.onHit(e);
            }
        }
    ]
};