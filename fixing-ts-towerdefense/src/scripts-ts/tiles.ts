import { myp5, ts } from "./sketch";
import { center } from "./utils";
 class tilesClass {
    // Basic
    empty:any = null
    tower = [51, 110, 123]
    wall = [1, 50, 67]
    // City
    grass = [30, 130, 76]
    static lCorner = function(x:number, y:number, dir:number) {
        if (dir === 0) return;
        myp5.push();
        var c = center(x, y);
        myp5.translate(c.x, c.y);
        myp5.rotate([0, myp5.PI / 2, myp5.PI, myp5.PI * 3 / 2][dir - 1]);

        myp5.noStroke();
        myp5.fill(250, 210, 1);
        var edge = 0.05 * ts;
        var end = 0.25 * ts;
        myp5.quad(-end, -edge, -end, edge, -edge, end, edge, end);

        myp5.pop();
    }
    static rCorner = function(x:number, y:number, dir:number) {
        if (dir === 0) return;
        myp5.push();
        var c = center(x, y);
        myp5.translate(c.x, c.y);
        myp5.rotate([myp5.PI / 2, myp5.PI, myp5.PI * 3 / 2, 0][dir - 1]);
    
        myp5.noStroke();
        myp5.fill(250, 210, 1);
        var edge = 0.05 * ts;
        var end = 0.25 * ts;
        myp5.quad(-end, -edge, -end, edge, -edge, end, edge, end);
    
        myp5.pop();
    }
    static road = function(x:number, y:number, dir:number) {
        if (dir === 0) return;
        myp5.push();
        var c = center(x, y);
        myp5.translate(c.x, c.y);
        myp5.rotate([0, myp5.PI / 2][(dir - 1) % 2]);

        myp5.noStroke();
        myp5.fill(250, 210, 1);
        var side = 0.05 * ts;
        var back = 0.15 * ts;
        myp5.rect(-back, -side, back * 2, side * 2);

        myp5.pop();
    }
    GetColors = function(colorName:string): number[]{
        switch(colorName) {
            case "sidewalk":
            return [149, 165, 166]
            case "neon_pink":
            return [255, 0, 153]
            case "neon_yellow":
                return [243, 243, 21]
            case "neon_green":
                return [131, 245, 44]
            case "neon_orange":
                return [255, 102, 0]
            case "neon_purple":
                return [110, 13, 208]
            // Color Set 0
            case "c0_lightBrown":
                return [206, 171, 171]
            case "c0_lightPurple":
                return [123, 95, 167]
            case "c0_mediumPurple":
                return [117, 65, 129]
            case "c0_darkPurple":
                return [55, 12, 63]
            case "c0_paleGreen":
                return [212, 244, 194]
            // Color Set 1
            case "c1_darkBlue":
                return [10, 25, 50]
            case "c1_mediumBlue":
                return [22, 64, 122]
            case "c1_lightBlue":
                return [34, 189, 197]
            case "c1_darkPurple":
                return [112, 35, 143]
            case "c1_neonPink":
                return [232, 33, 215]
            // Color Set 2
            case "c2_darkRed":
                return [135, 6, 13]
            case "c2_navyBlue":
                return [1, 18, 57]
            case "c2_darkBlue":
                return [3, 36, 97]
            case "c2_paleYellow":
                return [232, 228, 197]
            case "c2_lightYellow":
                return [248, 241, 193]
            case "empty": 
                return null
            case "wall": 
                return [1, 50, 67]
            case "grass":
                return [30, 130, 76]
            case "tower":
                return [51, 110, 123]
            case "road":
                return 
            default:
                return [149, 165, 166]
        }
    }
    displaySelection = function(selection:string, x:number, y:number, dir:number){
        switch(selection){
        case "lCorner":
            tilesClass.lCorner(x, y, dir)
            break
        case "rCorner":
            tilesClass.rCorner(x, y, dir)
            break
        case "road":
            tilesClass.road(x, y, dir)
            break
        }
    } 

};

export var tiles = new tilesClass