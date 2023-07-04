export function LFMap(name:string){
    var foundAMap:boolean = false; 
    var maps:Array<string> = [
        "branchAlt",
        "branch",
        "city",
        "fork",
        "freeway",
        "loop",
        "spiral",
        "walls"
    ]
    
    maps.forEach(element => {
        if (element == name){
            foundAMap = true
        }
    });
    console.log(name)
    return foundAMap
}
