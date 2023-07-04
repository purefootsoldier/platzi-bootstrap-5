import { Tower } from "../Contracts/TowerBase";
import { gun } from "../TowerClasses/gun";
import { bomb } from "../TowerClasses/bomb";
import { commander } from "../TowerClasses/commander";
import { laser } from "../TowerClasses/laser";
import { rocket } from "../TowerClasses/rocket";
import { sniper } from "../TowerClasses/sniper";
import { tesla } from "../TowerClasses/tesla";
import { slow } from "../TowerClasses/slow";
export function createTower(x:number ,y:number, template:string):Tower{
    var t: Tower;
    switch(template){
        case "gun": {
            t = new gun(x, y)
            break
        }
        case "bomb": {
            t = new bomb(x, y)
            break
        }
        case "slow": {
            t = new slow(x, y)
            break
        }
        case "commander": {
            t = new commander(x, y)
            break
        }
        case "laser": {
            t = new laser(x, y)
            break
        }
        case "rocket": {
            t = new rocket(x, y)
            break
        }
        case "sniper": {
            t = new sniper(x, y)
            break
        }
        case "tesla": {
            t = new tesla(x, y)
            break
        }
        default: {
            t = new gun(x, y)
        }
    }
    t.upgrade(template);
    t.onCreate();
    return t;
}