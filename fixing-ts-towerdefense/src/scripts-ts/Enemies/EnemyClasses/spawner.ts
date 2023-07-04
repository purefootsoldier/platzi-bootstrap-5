import { EnemyBase } from "../Contracts/EnemyBase";
import * as utilities from "../../utils"
import { exit, gameManager, muteSounds, myp5, sounds, tempSpawnCount, tempSpawns } from "../../sketch";
import { Vector } from "p5";
export class spawner extends EnemyBase {
    color: number[] = [244, 235, 66];
    radius: number = 0.7;
    name: string = 'spawner';
    cash: number = 10;
    health: number = 1150;
    onKilled() {
    if (this.alive) {
        gameManager.cash += this.cash;
        this.kill();
        if (!muteSounds && sounds.hasOwnProperty(this.sound)) {
            sounds[this.sound].play();
        }

        // Add new temporary spawnpoint
        var c = utilities.gridPos(this.pos.x, this.pos.y);
        
        if (c.equals(exit)) return;
        for (var i = 0; i < tempSpawns.length; i++) {
                if (c.equals(tempSpawns[i][0])) return;
        }
        tempSpawns.push([myp5.createVector(c.x, c.y), tempSpawnCount]);
    }
}
}