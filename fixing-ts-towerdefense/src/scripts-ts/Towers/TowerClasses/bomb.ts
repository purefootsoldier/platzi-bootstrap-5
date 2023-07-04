import { Tower } from "../Contracts/TowerBase"
import { enemies, myp5, particleAmt, showEffects, systems, ts } from "../../sketch"
import { EnemyBase } from "../../Enemies/Contracts/EnemyBase"
import * as utilities from "../../utils"
import { BombExplosion } from "../../Particles/ParticleClasses/BombExplosion"
export class bomb extends Tower{
    // Display
    baseOnTop:boolean = false
    color:Array<number> =  [102, 51, 153]
    drawLine:boolean = false
    length:number = 0.6
    width:number = 0.35
    secondary:Array<number> = [103, 128, 159]
    // Misc
    name:string = 'bomb';
    title:string = 'Bomb Tower';
    // Stats
    cooldownMax:number = 60;
    cooldownMin:number = 40;
    totalCost:number = 250;
    damageMax:number = 60;
    damageMin:number = 20;
    range:number = 2;
    type:string = 'explosion';
    // Methods
    drawBarrel() {
        myp5.stroke(this.border);
        myp5.fill(this.secondary);
        myp5.rect(0, -this.width * ts / 2, this.length * ts, this.width * ts);
        myp5.fill(191, 85, 236);
        myp5.ellipse(0, 0, this.radius * ts * 2 / 3, this.radius * ts * 2 / 3);
    };
    onHit(e:EnemyBase) {
        var blastRadius = 1;
        var inRadius = utilities.getInRange(e.pos.x, e.pos.y, blastRadius, enemies);
        myp5.noStroke();
        myp5.fill(191, 85, 236, 127);
        myp5.ellipse(e.pos.x, e.pos.y, ts * 2.5, ts * 2.5);
        if (showEffects) {
            var s = new BombExplosion(e.pos.x, e.pos.y);
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
    upgrades:Array<any> = [
        {
            // Display
            radius: 1.1,
            // Misc
            name: 'clusterBomb',
            title: 'Cluster Bomb',
            // Stats
            cooldownMax: 80,
            cooldownMin: 40,
            totalCost: 250,
            damageMax: 140,
            damageMin: 100,
            // Methods
            drawBarrel: function() {
                myp5.stroke(this.border);
                myp5.fill(this.secondary);
                myp5.rect(0, -this.width * ts / 2, this.length * ts, this.width * ts);
                myp5.fill(249, 105, 14);
                myp5.ellipse(0, 0, this.radius * ts * 2 / 3, this.radius * ts * 2 / 3);
            },
            onHit: function(e:EnemyBase) {
                var blastRadius = 1;
                var inRadius = utilities.getInRange(e.pos.x, e.pos.y, blastRadius, enemies);
                myp5.noStroke();
                myp5.fill(191, 85, 236, 127);
                myp5.ellipse(e.pos.x, e.pos.y, ts * 2.5, ts * 2.5);
                if (showEffects) {
                    var s = new BombExplosion(e.pos.x, e.pos.y);
                    for (var i = 0; i < particleAmt; i++) {
                        s.addParticle();
                    }
                    systems.push(s);
                }
                var segs = 3;
                var a0 = myp5.random(0, myp5.TWO_PI);
                for (var i = 0; i < segs; i++) {
                    var a = myp5.TWO_PI / segs * i + a0;
                    var d = 2 * ts;
                    var x = e.pos.x + myp5.cos(a) * d;
                    var y = e.pos.y + myp5.sin(a) * d;
                    var inRadius = utilities.getInRange(x, y, blastRadius, enemies);
                    if (showEffects) {
                        var s = new BombExplosion(x, y);
                        for (var j = 0; j < particleAmt / 2; j++) {
                            s.addParticle();
                        }
                        systems.push(s);
                    }
                    for (var j = 0; j < inRadius.length; j++) {
                        var h = inRadius[j];
                        var amt = myp5.round(myp5.random(this.damageMin, this.damageMax));
                        h.dealDamage(amt, this.type);
                    }
                }
            }
        }
    ]
};