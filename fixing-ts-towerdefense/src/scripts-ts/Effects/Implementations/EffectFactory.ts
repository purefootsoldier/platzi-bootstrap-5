import { Effect } from "../Contracts/EffectBase";
import { poison } from "../effectClasses/poison";
import { slow } from "../effectClasses/slow";
import { regen } from "../effectClasses/regen";

export function createEffect(duration:number,template:string):Effect{
    var effect:Effect;
    switch(template){
        case "slow":{
            effect = new slow(duration);
            break;
        }
        case "poison":{
            effect = new poison(duration);
            break;
        }
        case "regen" :{
            effect = new regen(duration);
            break;
        }
        default :{
            effect = new slow(duration);
        }
    }
    return effect;
}