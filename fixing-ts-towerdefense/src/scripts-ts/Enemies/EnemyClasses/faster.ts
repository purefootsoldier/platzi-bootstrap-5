import { myp5 } from "../../sketch";
import { EnemyBase } from "../Contracts/EnemyBase";
import { ts } from "../../sketch";

export class faster extends EnemyBase  {
    color: number[] = [249, 105, 14];
    name: string = 'faster';
    cash: number = 4;
    health: number = 375;
    resistant: string[] = ["explosion"]
    speed: number = 3;
    override draw() {
    myp5.push();
    myp5.translate(this.pos.x, this.pos.y);
    myp5.rotate(this.vel.heading());

    myp5.stroke(0);
    myp5.fill(this.getColor());
    var back = -0.7 * ts / 3;
    var front = back + 0.7 * ts;
    var side = 0.9 * ts / 2;
    myp5.quad(back, -side, 0, 0, back, side, front, 0);

    myp5.pop();
}
}