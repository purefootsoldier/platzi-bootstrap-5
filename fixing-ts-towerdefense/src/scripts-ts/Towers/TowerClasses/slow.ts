import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
import { Tower } from "../Contracts/TowerBase";
import { myp5, stopFiring } from "../../sketch";
import { ts } from "../../sketch";
export class slow extends Tower {
    baseOnTop:boolean = false
    color:Array<number> = [75, 119, 190]
    drawLine:boolean = false
    length:number = 1.1
    radius:number = 0.9
    secondary:Array<number> = [189, 195, 199]
    width:number = 0.3
    // Misc
    name:string = 'slow'
    title:string = 'Slow Tower'
    // Stats
    cooldownMax:number = 0
    cooldownMin:number = 0
    cost:number = 100
    damageMax:number = 0
    damageMin:number = 0
    range:number = 1
    type:string = 'slow'
    drawBarrel() {
        myp5.stroke(this.border);
        myp5.fill(this.secondary);
        var back = -this.length * ts / 2;
        var side = this.width * ts / 2;
        myp5.rect(back, -side, this.length * ts, this.width * ts);
    }
    onAim(e:EnemyBase) {
        this.attack(e);
    }
    onHit(e:EnemyBase) {
        e.applyEffect('slow', 40);
    }
    // Target correct enemy
    target(entities:Array<EnemyBase>) {
        if (stopFiring) return;
        entities = this.visible(entities);
        if (entities.length === 0) return;
        if (!this.canFire()) return;
        this.resetCooldown();
        myp5.noStroke();
        myp5.fill(this.color[0], this.color[1], this.color[2], 127);
        var r = this.range * 2 + 1;
        myp5.ellipse(this.pos.x, this.pos.y, r * ts, r * ts);
        for (var i = 0; i < entities.length; i++) {
            this.onAim(entities[i]);
        }
    }
    update() {
        this.angle += myp5.PI / 60;
        if (this.cd > 0) this.cd--;
    }
    // Upgrades
    upgrades:Array<any> = [
        {
            // Display
            color: [102, 204, 26],
            radius: 0.9,
            // Misc
            name: 'poison',
            title: 'Poison Tower',
            // Stats
            cooldownMax: 60,
            cooldownMin: 60,
            cost: 150,
            range: 2,
            type: 'poison',
            // Methods
            onHit(e: EnemyBase) {
                e.applyEffect('poison', 60)
            }
        }
    ]
};
