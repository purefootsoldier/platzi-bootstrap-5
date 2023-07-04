import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
import { Effect } from "../Contracts/EffectBase";


export class poison extends Effect{
    color = [102,204,26];
    name = "poison";
    onTick = function(e:EnemyBase){
        e.dealDamage(1, "poison")
    }
}