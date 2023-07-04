import { Effect } from "../Contracts/EffectBase";
import { EnemyBase } from "../../Enemies/Contracts/EnemyBase";
export class slow extends Effect{
    color = [68, 108, 79];
    name = "slow";
    oldSpeed = 0;
    speed = 0
    onEnd(e:EnemyBase){
        e.speed = this.oldSpeed;
    }
    onStart(e:EnemyBase) {
        this.oldSpeed = e.speed;
        this.speed = e.speed / 2;
        e.speed = this.speed;
    }
}