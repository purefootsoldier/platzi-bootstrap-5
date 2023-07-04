import { EnemyBase } from "../Contracts/EnemyBase";
import { myp5 } from "../../sketch";
import { ts } from "../../sketch";
export class fast extends EnemyBase  {
    color: number[] = [61, 251, 255];
    name: string = 'fast';
    cash: number = 2;
    health: number = 75;
    speed: number = 2;
    draw()  {
        myp5.push();
        myp5.translate(this.pos.x, this.pos.y);
        myp5.rotate(this.vel.heading());

        myp5.stroke(0);
		myp5.fill(this.getColor());
        var back = -0.55 * ts / 3;
        var front = back + 0.55 * ts;
        var side = 0.8 * ts / 2;
        myp5.quad(back, -side, 0, 0, back, side, front, 0);
        
        myp5.pop();
    }
}