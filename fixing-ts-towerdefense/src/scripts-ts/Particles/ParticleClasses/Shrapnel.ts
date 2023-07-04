import { Vector } from "p5";
import { Fire } from "./Fire";
import { myp5 } from "../../sketch";
import * as utilities from "../../utils"
export class Shrapnel extends Fire {
    constructor(pos:Vector, speed:number) {
        super(pos, speed);
        this.decay = myp5.random(8, 10);
        var r = 63 + myp5.random(127);
        this.color = [r, r, r];
        this.radius = utilities.randint(2, 6);
    }
}