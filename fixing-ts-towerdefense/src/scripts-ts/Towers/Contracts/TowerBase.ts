import { muteSounds, sellConst, sketch, sounds, stopFiring } from "../../sketch";
import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
import  { Vector }  from "p5";
import { ts } from "../../sketch";
import { myp5 } from "../../sketch";
import * as utilities from "../../utils" 
export class Tower{
    baseOnTop:boolean;
    border:Array<number>;
    color:Array<number>;
    drawLine:boolean;
    follow:boolean;
    hasBarrel:boolean;
    hasBase:boolean;
    length:number;
    radius:number;
    secondary:Array<number>;
    weight:number;
    width:number;

    alive:boolean;
    name:string;
    sound:any;
    title:string;

    angle:number;
    gridPos:Vector;
    pos:Vector;

    cooldownMax:number;
    cooldownMin:number;
    cost:number;
    damageMax:number;
    damageMin:number;
    range:number;
    totalCost:number;
    type:string;
    upgrades:Array<any>;
    cd: number;
    sellCost: number;
    constructor(col:number, row:number){
        // Display
        this.baseOnTop = true;      // render base over barrel
        this.border = [0, 0, 0];    // border color
        this.color = [0, 0, 0];     // main color
        this.drawLine = true;       // draw line to enemy on attack
        this.follow = true;         // follow target even when not firing
        this.hasBarrel = true;
        this.hasBase = true;
        this.length = 0.7;          // barrel length in tiles
        this.radius = 1;            // radius in tiles
        this.secondary = [0, 0, 0]; // secondary color
        this.weight = 2;            // laser stroke weight
        this.width = 0.3;           // barrel width in tiles

        // Misc
        this.alive = true;
        this.name = 'tower';
        this.sound = null;          // sound to play on fire
        this.title = 'Tower';

        // Position
        this.angle = 0;
        this.gridPos = myp5.createVector(col, row);
        this.pos = myp5.createVector(col*ts + ts/2, row*ts + ts/2);
        
        // Stats
        this.cd = 0;
        this.cooldownMax = 0;
        this.cooldownMin = 0;
        this.cost = 0;
        this.damageMax = 20;
        this.damageMin = 1;
        this.range = 3;
        this.totalCost = 0;
        this.type = 'physical';     // damage type
        this.upgrades = [];
        this.sellCost = 0;

    }
    aim(x:number, y:number) {
        this.angle = myp5.atan2(y - this.pos.y, x - this.pos.x);
    }
    attack(e:EnemyBase) {
        var damage = myp5.round(myp5.random(this.damageMin, this.damageMax));
        e.dealDamage(damage, this.type);
        if (!muteSounds && sounds.hasOwnProperty(this.sound)) {
            sounds[this.sound].play();
        }
        this.onHit(e);
    }

    // Check if cooldown is completed
    canFire() {
        return this.cd === 0;
    }

    draw() {
        // Draw turret base
        if (this.hasBase && !this.baseOnTop) this.drawBase();
        // Draw barrel
        if (this.hasBarrel) {
            myp5.push();
            myp5.translate(this.pos.x, this.pos.y);
            myp5.rotate(this.angle);
            this.drawBarrel();
            myp5.pop();
        }
        // Draw turret base
        if (this.hasBase && this.baseOnTop) this.drawBase();
    }

    // Draw barrel of tower (moveable part)
    drawBarrel() {
        myp5.stroke(this.border);
        myp5.fill(this.secondary);
        myp5.rect(0, -this.width * ts / 2, this.length * ts, this.width * ts);
    }

    // Draw base of tower (stationary part)
    drawBase() {
        myp5.stroke(this.border);
        myp5.fill(this.color);
        myp5.ellipse(this.pos.x, this.pos.y, this.radius * ts, this.radius * ts);
    }

    // Returns damage range
    getDamage() {
        return utilities.rangeText(this.damageMin, this.damageMax);
    }

    // Returns average cooldown in seconds
    getCooldown() {
        /*if (inCommanderRadious){
            return (this.cooldownMin + this.cooldownMax) / (120 * commanderFactor);
        }
        else{*/
        return (this.cooldownMin + this.cooldownMax) / 120;
        
    }

    kill() {
        this.alive = false;
    }

    isDead() {
        return !this.alive;
    }

    // Functionality once entity has been targeted
    onAim(e:EnemyBase) {
        if (this.canFire() || this.follow) this.aim(e.pos.x, e.pos.y);
        if (stopFiring) return;
        if (!this.canFire()) return;
        this.resetCooldown();
        this.attack(e);
        // Draw line to target
        if (!this.drawLine) return;
        myp5.stroke(this.color);
        myp5.strokeWeight(this.weight);
        myp5.line(this.pos.x, this.pos.y, e.pos.x, e.pos.y);
        myp5.strokeWeight(1);
    }

    onCreate() {
        this.cd = 0;                // current cooldown left
    }

    onHit(e:EnemyBase) {}

    resetCooldown() {
        var cooldown = myp5.round(myp5.random(this.cooldownMin, this.cooldownMax));
        this.cd = cooldown;
    }

    // Sell price
    sellPrice() {
        this.sellCost = myp5.floor(this.totalCost * sellConst);
        return this.sellCost;
    }

    // Target correct enemy
    target(entities:Array<EnemyBase>) {
        entities = this.visible(entities);
        if (entities.length === 0) return;
        var t = utilities.getTaunting(entities);
        if (t.length > 0) entities = t;
        var e = utilities.getFirst(entities);
        if (typeof e === 'undefined') return;
        this.onAim(e);
    }

    update() {
        if (this.cd > 0) this.cd--;
    }

    // Use template to set attributes
    upgrade(template:Tower | {}) {
        template = typeof template === 'undefined' ? {} : template;
        var keys = Object.keys(template) as Array<keyof typeof template>;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            this[key] = template[key];
        }
        if (typeof template === 'object' && template instanceof Tower){
            if (template.totalCost) this.totalCost += template.totalCost;
        }
        
    }

    // Returns array of visible entities out of passed array
    visible(entities:Array<EnemyBase>) {
        return utilities.getInRange(this.pos.x, this.pos.y, this.range, entities);
    }
}