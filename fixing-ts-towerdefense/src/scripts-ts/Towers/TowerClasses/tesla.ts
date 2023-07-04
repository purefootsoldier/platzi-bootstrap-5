import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
import { enemies, muteSounds, myp5, sounds, stopFiring, ts } from "../../sketch";
import { Tower } from "../Contracts/TowerBase";
import * as utilities from "../../utils"

export class tesla extends Tower {
    // Display
    color:Array<number> = [255, 255, 0]
    hasBase:boolean =  false
    radius:number = 1
    secondary:Array<number> = [30, 139, 195]
    weight:number = 10
    // Misc
    name:string = 'tesla'
    sound:string = 'spark'
    title:string = 'Tesla Coil'
    // Stats
    cooldownMax:number = 80
    cooldownMin:number = 60
    totalCost:number = 350
    damageMax:number = 512
    damageMin:number = 256
    range:number = 4
    type:string = 'energy'
    // Methods
    drawBarrel() {
        myp5.stroke(this.border);
        myp5.fill(this.secondary);
        utilities.polygon(0, 0, 0.5 * ts, 6);
        myp5.fill(this.color);
        var r = 0.55 * ts;
        myp5.ellipse(0, 0, r, r);
    }
    onAim(e:EnemyBase) {
        if (this.canFire() || this.follow) this.aim(e.pos.x, e.pos.y);
        if (stopFiring) return;
        if (!this.canFire()) return;
        this.resetCooldown();

        var last = e;
        var targets = [];
        var dmg = myp5.round(myp5.random(this.damageMin, this.damageMax));
        var weight = this.weight;
        myp5.stroke(this.color);
        myp5.strokeWeight(weight);
        myp5.line(this.pos.x, this.pos.y, e.pos.x, e.pos.y);
        if (!muteSounds && sounds.hasOwnProperty(this.sound)) {
            sounds[this.sound].play();
        }
        while (dmg > 1) {
            weight -= 1;
            last.dealDamage(dmg, this.type);
            targets.push(last);
            var next = utilities.getNearest(enemies, last.pos, targets);
            if (typeof next === 'undefined') break;
            myp5.strokeWeight(weight);
            var x = myp5.random(last.pos.x, next.pos.x);
            var y = myp5.random(last.pos.y, next.pos.y);
            myp5.line(last.pos.x, last.pos.y, x, y);
            myp5.line(x, y, next.pos.x, next.pos.y);
            last = next;
            dmg /= 2;
        }
        myp5.strokeWeight(1);
    }
    // Upgrades
    upgrades:Array<any> = [
        {
            // Display
            color: [25, 181, 254],
            radius: 1.1,
            secondary: [51, 110, 123],
            // Misc
            name: 'plasma',
            title: 'Plasma Tower',
            // Stats
            cooldownMax: 60,
            cooldownMin: 40,
            totalCost: 250,
            damageMax: 2048,
            damageMin: 1024,
            // Methods
            drawBarrel: function() {
                myp5.stroke(this.border);
                myp5.fill(this.secondary);
                utilities.polygon(0, 0, this.radius * ts / 2, 6);
                myp5.fill(this.color);
                var r = 0.6 * ts;
                myp5.ellipse(0, 0, r, r);
            },
            onAim(e:EnemyBase) {
                if (this.canFire() || this.follow) this.aim(e.pos.x, e.pos.y);
                if (stopFiring) return;
                if (!this.canFire()) return;
                this.resetCooldown();
        
                var last = e;
                var targets = [];
                var dmg = myp5.round(myp5.random(this.damageMin, this.damageMax));
                var weight = this.weight;
                myp5.stroke(this.color);
                myp5.strokeWeight(weight);
                myp5.line(this.pos.x, this.pos.y, e.pos.x, e.pos.y);
                if (!muteSounds && sounds.hasOwnProperty(this.sound)) {
                    sounds[this.sound].play();
                }
                while (dmg > 1) {
                    weight -= 1;
                    last.dealDamage(dmg, this.type);
                    targets.push(last);
                    var next = utilities.getNearest(enemies, last.pos, targets);
                    if (typeof next === 'undefined') break;
                    myp5.strokeWeight(weight);
                    var x = myp5.random(last.pos.x, next.pos.x);
                    var y = myp5.random(last.pos.y, next.pos.y);
                    myp5.line(last.pos.x, last.pos.y, x, y);
                    myp5.line(x, y, next.pos.x, next.pos.y);
                    last = next;
                    dmg /= 2;
                }
                myp5.strokeWeight(1);
            },
        }
    ]
};