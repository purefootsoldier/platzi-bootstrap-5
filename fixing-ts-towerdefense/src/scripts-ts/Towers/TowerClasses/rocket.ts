import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
import { Missile } from "../../missile";
import { muteSounds, myp5, projectiles, sounds, stopFiring, ts } from "../../sketch";
import { Tower } from "../Contracts/TowerBase";

export class rocket extends Tower {
    // Display
    baseOnTop:boolean = false
    color:Array<number> = [30, 130, 76]
    drawLine:boolean = false
    length:number = 0.6
    radius:number = 0.75
    secondary:Array<number> = [189, 195, 199]
    width:number = 0.2
    // Misc
    name:string = 'rocket'
    sound:string = 'missile'
    title:string = 'Rocket Tower'
    // Stats
    cooldownMax:number = 80
    cooldownMin:number = 60
    totalCost:number = 250
    range:number = 7
    damageMax:number = 60
    damageMin:number = 40
    type:string = 'explosion'
    // Methods
    drawBarrel() {
        myp5.stroke(this.border);
        myp5.fill(this.secondary);
        myp5.rect(0, -this.width * ts, this.length * ts, this.width * ts);
        myp5.rect(0, 0, this.length * ts, this.width * ts);
        myp5.fill(207, 0, 15);
        var mid = this.width * ts / 2;
        var base = this.length * ts;
        var tip = this.length * ts + this.width * ts * 2;
        var side = this.width * ts;
        myp5.triangle(base, -side, tip, -mid, base, 0);
        myp5.triangle(base, side, tip, mid, base, 0);
        myp5.fill(this.color);
        var edge = this.width * ts * 4;
        var fEdge = this.width * ts * 1.5;
        var back = -this.width * ts * 0.75;
        var front = this.width * ts * 1.25;
        myp5.quad(back, -edge, back, edge, front, fEdge, front, -fEdge);
    }
    drawBase() {
        myp5.stroke(this.border);
        myp5.fill(this.secondary);
        myp5.ellipse(this.pos.x, this.pos.y, this.radius * ts, this.radius * ts);
    }
    onAim(e:EnemyBase) {
        if (this.canFire() || this.follow) this.aim(e.pos.x, e.pos.y);
        if (stopFiring) return;
        if (!this.canFire()) return;
        this.resetCooldown();
        projectiles.push(new Missile(this.pos, e));
        if (!muteSounds && sounds.hasOwnProperty(this.sound)) {
            sounds[this.sound].play();
        }
    }
    // Upgrades
    upgrades:any = 
        {
            // Display
            color: [65, 131, 215],
            secondary: [108, 122, 137],
            // Misc
            name: 'missileSilo',
            sound: 'missile',
            title: 'Missile Silo',
            // Stats
            cooldownMax: 80,
            cooldownMin: 40,
            totalCost: 250,
            damageMax: 120,
            damageMin: 100,
            range: 9,
            // Methods
            drawBarrel: function() {
                myp5.stroke(this.border);
                myp5.fill(this.secondary);
                myp5.rect(0, -this.width * ts, this.length * ts, this.width * ts);
                myp5.rect(0, 0, this.length * ts, this.width * ts);
                myp5.fill(this.color);
                var mid = this.width * ts / 2;
                var base = this.length * ts;
                var tip = this.length * ts + this.width * ts * 2;
                var side = this.width * ts;
                myp5.triangle(base, -side, tip, -mid, base, 0);
                myp5.triangle(base, side, tip, mid, base, 0);
                myp5.fill(31, 58, 147);
                var edge = this.width * ts * 4;
                var fEdge = this.width * ts * 1.5;
                var back = -this.width * ts * 0.75;
                var front = this.width * ts * 1.25;
                myp5.quad(back, -edge, back, edge, front, fEdge, front, -fEdge);
            },
            onAim(e:EnemyBase) {
                if (this.canFire() || this.follow) this.aim(e.pos.x, e.pos.y);
                if (stopFiring) return;
                if (!this.canFire()) return;
                this.resetCooldown();
                var m = new Missile(this.pos, e);
                m.color = [65, 131, 215];
                m.secondary = this.secondary;
                m.blastRadius = 2;
                m.damageMax = this.damageMax;
                m.damageMin = this.damageMin;
                m.accAmt = 0.7;
                m.topSpeed = (6 * 24) / ts;
                projectiles.push(m);
                if (!muteSounds && sounds.hasOwnProperty(this.sound)) {
                    sounds[this.sound].play();
                }
            },
        }
    
};