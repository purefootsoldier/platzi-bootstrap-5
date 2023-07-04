import { branchAlt } from "../mapsClasses/branchAltMap";
import { branch } from "../mapsClasses/branchMap";
import { city } from "../mapsClasses/cityMap";
import { fork } from "../mapsClasses/forkMap";
import { freeway } from "../mapsClasses/freewaymap";
import { loop } from "../mapsClasses/loopMap";
import { BaseMaps } from "../Contracts/BaseMaps";
import { spiral } from "../mapsClasses/spiralMap";
export function ChooseMap(map:string):BaseMaps{
    var chosen = map;
    switch (chosen){
        case "branchAlt":
            return new branchAlt()
            break
        case "branch":
            return new branch()
            break
        case "city":
            return new city()
            break
        case "fork":
            return new fork()
            break
        case "freeway":
            return new freeway()
            break
        case "loops":
            return new loop()
            break
        case "spiral":
            return new spiral()
            break
        default:
            return new branchAlt()
    }
}