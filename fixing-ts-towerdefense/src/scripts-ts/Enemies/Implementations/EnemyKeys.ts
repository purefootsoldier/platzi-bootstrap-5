export function LFEnemies(name:string){
    var EnemyFound:string = ""; 
    var enemies:Array<string> = [
        "fast",
        "faster",
        "medic",
        "spawner",
        "strong",
        "stronger",
        "strongfast",
        "tank",
        "taunt",
        "weak"
    ]
    
    enemies.forEach(element => {
        if (element == name){
            EnemyFound = name
        }
    });
    return EnemyFound
}