import { myp5 } from "../../sketch";
import { EnemyBase } from "../Contracts/EnemyBase";
import { ts } from "../../sketch";
export class tank extends EnemyBase {
    color: number[] = [30, 130, 76];
    radius: number = 1;
    name: string = 'tank';
    cash: number = 4;
    health: number = 750;
    immune: string[] = ["poison", "slow"];
    resistant: string[] = ["energy", "physical"];
    weak: string[] = ["explosion", "piercing"];
    draw = () => {
    myp5.push();
    myp5.translate(this.pos.x, this.pos.y);
    myp5.rotate(this.vel.heading());

    myp5.stroke(0);
    myp5.fill(this.getColor());
    var front = this.radius * ts / 2;
    var side = 0.7 * ts / 2;
    var barrel = 0.15 * ts / 2;
    var length = 0.7 * ts;
    var curve = 0.2 * ts;
    myp5.rect(-front, -side, front * 2, side * 2, curve);
    myp5.fill(149, 165, 166);
    myp5.rect(0, -barrel, length, barrel * 2);
    myp5.ellipse(0, 0, 0.2 * ts * 2, 0.2 * ts * 2);

    myp5.pop();
}
}