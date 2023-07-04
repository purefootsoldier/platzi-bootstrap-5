import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
import { Effect } from "../Contracts/EffectBase";
import { myp5 } from "../../sketch";

export class regen extends Effect{
    color = [210, 82, 127];
    name = "regen";
    onTick = function(e:EnemyBase){
        if (e.health < e.maxHealth && myp5.random() < 0.2) e.health++;
    }
}