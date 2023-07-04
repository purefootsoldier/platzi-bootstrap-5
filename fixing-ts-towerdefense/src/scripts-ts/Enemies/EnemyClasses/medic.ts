import { EnemyBase } from "../Contracts/EnemyBase";
import * as utilities from "../../utils"

export class medic extends EnemyBase {
    color: number[] = [192, 57, 43];
    radious: number = 0.7;
    name: string = "medic";
    cash: number = 4;
    health: number = 375;
    immune: string[] = ["regen"];
    enemies: EnemyBase[] = [];
    onTick() {
    var affected = utilities.getInRange(this.pos.x, this.pos.y, 2, this.enemies);
    for (var i = 0; i < affected.length; i++) {
        affected[i].applyEffect('regen', 1);
    }
}
}