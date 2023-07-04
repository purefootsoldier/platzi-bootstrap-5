import { EnemyBase } from "../Contracts/EnemyBase";

export class strong extends EnemyBase {
    color: number[] = [108, 122, 137];
    radious: number = 0.6;
    name: string = 'strong';
    cash: number = 1;
    health: number = 75;
}