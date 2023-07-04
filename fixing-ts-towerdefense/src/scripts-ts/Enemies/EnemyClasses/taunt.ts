import { myp5 } from "../../sketch";
import { EnemyBase } from "../Contracts/EnemyBase";
import { ts } from "../../sketch";

export class taunt extends EnemyBase {
    color: number[] = [102, 51, 153];
    radius: number = 0.8;
    name: string = 'taunt';
    sound: string = 'taunt';
    cash: number = 8;
    health: number = 1500;
    immune: string[] = ["poison", "slow"];
    resistant: string[] = ["energy", "physical"];
    taunt: boolean = true;

    draw = () =>{
    myp5.push();
    myp5.translate(this.pos.x, this.pos.y);
    myp5.rotate(this.vel.heading());

    myp5.stroke(0);
    myp5.fill(this.getColor());
    var edge = this.radius * ts / 2;
    myp5.rect(-edge, -edge, this.radius * ts, this.radius * ts);
    myp5.stroke(232, 126, 4);
    myp5.noFill();
    myp5.rect(-0.3 * ts, -0.3 * ts, 0.6 * ts, 0.6 * ts);
    myp5.rect(-0.2 * ts, -0.2 * ts, 0.4 * ts, 0.4 * ts);

    myp5.pop();
}
}