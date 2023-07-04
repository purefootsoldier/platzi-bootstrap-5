import { EnemyBase } from "../Contracts/EnemyBase";

export class weak extends EnemyBase  {
    color: number[] = [189, 195, 199];
    name: string = 'weak';
    cash: number = 1;
    health: number = 35;
}