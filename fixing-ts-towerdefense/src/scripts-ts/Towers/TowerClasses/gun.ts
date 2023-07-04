import { Tower } from "../Contracts/TowerBase";
export class gun extends Tower{
color:Array<number> = [249, 191, 59]
length:number = 0.65
radius:number = 0.9
secondary:Array<number> = [149, 165, 166]
// Misc
name:string = 'gun'
title:string = 'Gun Tower'
// Stats
cooldownMax:number =  18
cooldownMin:number = 8
totalCost:number = 25
range:number = 3
// Upgrades
upgrades:Array<any> = [
{
    // Display
    color: [249, 105, 14],
    // Misc
    name: 'machineGun',
    title: 'Machine Gun',
    // Stats
    cooldownMax: 5,
    cooldownMin: 0,
    totalCost: 75,
    damageMax: 10,
    damageMin: 0
}
]
};