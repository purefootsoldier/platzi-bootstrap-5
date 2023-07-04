import { Vector } from "p5";
import { Particle } from "../Contracts/Particles";
import { myp5 } from "../../sketch";
import * as utilities from "../../utils"

export class Bomb extends Particle {
    constructor(pos:Vector, speed:number) {
        super(pos, speed);
        this.decay = myp5.random(8, 10);
        this.color = [151 + myp5.random(80), 45 + myp5.random(60), 200 + myp5.random(55)];
        this.radius = utilities.randint(2, 6);
    }
}