import { weak } from "../EnemyClasses/weak";
import { EnemyBase } from "../Contracts/EnemyBase";
import { strong } from "../EnemyClasses/strong";
import { fast } from "../EnemyClasses/fast";
import { strongFast } from "../EnemyClasses/strongFast";
import { medic } from "../EnemyClasses/medic";
import { stronger } from "../EnemyClasses/stronger";
import { faster } from "../EnemyClasses/faster";
import { tank } from "../EnemyClasses/tank";
import { taunt } from "../EnemyClasses/taunt";
import { spawner } from "../EnemyClasses/spawner";
export function createEnemy(x:number, y:number, Ename: string): EnemyBase {
    var enemy: EnemyBase;
    switch (Ename) {
        case "weak": {
            enemy = new weak(x, y);
            break
        }
        case "strong": {
            enemy = new strong(x, y)
            break
        }
        case "fast": {
            enemy = new fast(x, y)
            break
        }
        case "strongFast": {
            enemy = new strongFast(x, y)
            break
        }
        case "medic": {
            enemy = new medic(x, y)
            break
        }
        case "stronger": {
            enemy = new stronger(x, y)
            break
        }
        case "faster": {
            enemy = new faster(x, y)
            break
        }
        case "tank": {
            enemy = new tank(x, y)
            break
        }
        case "taunt": {
            enemy = new taunt(x, y)
            break
        }
        case "spawner": {
            enemy = new spawner(x, y)
            break
        }
        default: {
            enemy = new weak(x, y);
        }
    }
    enemy.onCreate()
    return enemy;
}