import { EnemyBase } from "../Contracts/EnemyBase";

export class stronger extends EnemyBase {
    color: number[] = [52, 73, 94];
    radious: number = 0.8;
    name: string = 'stronger';
    cash: number = 4;
    health: number = 375;
}