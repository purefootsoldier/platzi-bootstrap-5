import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
import { enemies, myp5, particleAmt, showEffects, stopFiring, systems, ts } from "../../sketch";
import { Tower } from "../Contracts/TowerBase";
import * as utilities from "../../utils"
import { SharpnelExplosion } from "../../Particles/ParticleClasses/SharpnelExplosion";

export class sniper extends Tower {
    // Display
    color:Array<number> = [207, 0, 15]
    follow:boolean = false
    hasBase:boolean = false
    radius:number = 0.9
    weight:number = 3
    // Misc
    name:string = 'sniper'
    sound:string = 'sniper'
    title:string = 'Sniper Tower'
    // Stats
    cooldownMax:number = 100
    cooldownMin:number = 60
    totalCost:number = 150
    damageMax:number = 100
    damageMin:number = 100
    range:number = 9
    // Methods
    drawBarrel() {
        myp5.stroke(0);
        myp5.fill(this.color);
        var height = this.radius * ts * myp5.sqrt(3) / 2;
        var back = -height / 3;
        var front = height * 2 / 3;
        var side = this.radius * ts / 2;
        myp5.triangle(back, -side, back, side, front, 0);
    }
    target(entities: Array<EnemyBase>) {
        if (stopFiring) return;
        entities = this.visible(entities);
        if (entities.length === 0) return;
        var t = utilities.getTaunting(entities);
        if (t.length > 0) entities = t;
        var e = utilities.getStrongest(entities);
        if (typeof e === 'undefined') return;
        this.onAim(e);
    }
    // Upgrades
    upgrades:Array<any> = [
        {
            // Display
            baseOnTop: false,
            color: [103, 65, 114],
            hasBase: true,
            length: 0.7,
            radius: 1,
            secondary: [103, 128, 159],
            weight: 4,
            width: 0.4,
            // Misc
            name: 'railgun',
            sound: 'railgun',
            title: 'Railgun',
            // Stats
            cooldownMax: 120,
            cooldownMin: 100,
            totalCost: 300,
            damageMax: 200,
            damageMin: 200,
            range: 11,
            type: 'piercing',
            // Methods
            drawBarrel: function() {
                myp5.stroke(this.border);
                myp5.fill(this.secondary);
                var base = -this.length * ts;
                var side = -this.width * ts / 2;
                myp5.rect(base, side, this.length * ts * 2, this.width * ts);
                myp5.fill(207, 0, 15);
                myp5.ellipse(0, 0, this.radius * ts * 2 / 3, this.radius * ts * 2 / 3);
            },
            onHit: function(e:EnemyBase) {
                var blastRadius = 1;
                var inRadius = utilities.getInRange(e.pos.x, e.pos.y, blastRadius, enemies);
                myp5.noStroke();
                myp5.fill(this.color[0], this.color[1], this.color[2], 127);
                myp5.ellipse(e.pos.x, e.pos.y, ts * 2.5, ts * 2.5);
                if (showEffects) {
                    var s = new SharpnelExplosion(e.pos.x, e.pos.y);
                    for (var i = 0; i < particleAmt; i++) {
                        s.addParticle();
                    }
                    systems.push(s);
                }
                for (var i = 0; i < inRadius.length; i++) {
                    var h = inRadius[i];
                    var amt = myp5.round(myp5.random(this.damageMin, this.damageMax));
                    h.dealDamage(amt, this.type);
                }
            }
        }
    ]
};