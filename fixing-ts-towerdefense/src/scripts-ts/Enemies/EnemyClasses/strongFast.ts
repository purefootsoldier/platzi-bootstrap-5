import { myp5 } from "../../sketch";
import { EnemyBase } from "../Contracts/EnemyBase";
import { ts } from "../../sketch";

export class strongFast extends EnemyBase {
    color: number[] = [30, 139, 195];
    name: string = "stongFast";
    cash: number = 2;
    health: number = 135;
    speed: number = 2;
    draw() {
    myp5.push();
    myp5.translate(this.pos.x, this.pos.y);
    myp5.rotate(this.vel.heading());

    myp5.stroke(0);
    myp5.fill(this.getColor());
    var back = -0.8 * ts / 3;
    var front = back + 0.8 * ts;
    var side = ts / 2;
    myp5.quad(back, -side, 0, 0, back, side, front, 0);

    myp5.pop();
}
}