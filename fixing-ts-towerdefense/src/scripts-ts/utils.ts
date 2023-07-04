
import { Vector } from "p5";
import { ts , myp5, dists, tempSpawns} from "./sketch";
import { EnemyBase } from "./Enemies/Contracts/EnemyBase";
import { Effect } from "./Effects/Contracts/EffectBase";

export function atTileCenter(x:number, y:number, col:number, row:number) {
    var c = center(col, row);
    var t = ts / 24;
    return between(x, c.x - t, c.x + t) && between(y, c.y - t, c.y + t);
}

// Check if number falls within range (exclusive)
export function between(num:number, min:number, max:number) {
    return num > Math.min(min, max) && num < Math.max(min, max);
}

// Build 2d array of value
export function buildArray(cols:number, rows:number, val:Array<Array<number> | number> | null | number) {
    var arr:any[][] = [];
    for (var x = 0; x < cols; x++) {
        arr[x] = [];
        for (var y = 0; y < rows; y++) {
            arr[x][y] = val;
        }
    }
    return arr;
}

// Return position at center of tile
export function center(col:number, row:number):Vector {
    return new Vector(col*ts + ts/2, row*ts + ts/2);
}

// Copy 2d array
export function copyArray(arr:number[][]) {
    var newArr:number[][] = [];
    for (var x = 0; x < arr.length; x++) {
        newArr[x] = [];
        for (var y = 0; y < arr[x].length; y++) {
            newArr[x][y] = arr[x][y];
        }
    }
    return newArr;
}

// Copy text to clipboard
export function copyToClipboard(str:string) {
    var textArea = document.createElement('textarea');

    // Ensure element is as invisible as possible
    textArea.style.position = 'fixed';
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = "0";
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();

    // Copy text
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text was ' + msg);
    } catch (err) {
        console.log('Unable to copy to clipboard');
        prompt('Map string:', str);
    }

    document.body.removeChild(textArea);
}

// Convert grid coordinates to string
export function cts(col:number, row:number) {
    return col + ',' + row;
}

// Returns an array of entities with a certain name
export function getByName(entities:Effect[], names:string | string[]) {
    var results = [];
    if (typeof names === 'string') names = [names];
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        for (var j = 0; j < names.length; j++) {
            if (e.name === names[j]) results.push(e);
        }
    }
    return results;
}

// Get first enemy (i.e. closest to exit)
// TODO determine more accurate selection system that is not fooled by loops
export function getFirst(entities:EnemyBase[]) {
    var leastDist = 10000;
    var chosen = entities[0];
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        var t = gridPos(e.pos.x, e.pos.y);
        var dist = dists[t.x][t.y];
        if (dist < leastDist) {
            leastDist = dist;
            chosen = e;
        }
    }
    return chosen;
}

// Get entities within a range (radius in tiles)
// TODO have minimum and maximum range
export function getInRange(cx:number, cy:number, radius:number, entities:EnemyBase[]) {
    var results = [];
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        if (insideCircle(e.pos.x, e.pos.y, cx, cy, (radius + 1) * ts)) {
            results.push(e);
        }
    }
    return results;
}

// Nearest to entity
export function getNearest(entities:EnemyBase[], pos:Vector, ignore?:EnemyBase[]) {
    var lowestDist = 10000;
    var chosen = entities[0];
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        if (typeof ignore !== 'undefined' && ignore.includes(e)) continue;
        var dist = pos.dist(e.pos);
        if (dist < lowestDist) {
            lowestDist = dist;
            chosen = e;
        }
    }
    return chosen;
}

// Get entities without a certain status effect
export function getNoEffect(entities:EnemyBase[], effect:Effect) {
    var results = [];
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        if (getByName(e.effects, effect.name).length === 0) results.push(e);
    }
    return results;
}

// Get enemy with the most health
export function getStrongest(entities:EnemyBase[]) {
    var mostHealth = 0;
    var chosen = entities[0];
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        if (e.health > mostHealth) {
            mostHealth = e.health;
            chosen = e;
        }
    }
    return chosen;
}

// Get all taunting enemies
export function getTaunting(entities:EnemyBase[]) {
    var results = [];
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        if (e.taunt) results.push(e);
    }
    return results;
}

/**
 * regresa una cordenada en la cuadricula en vectores
 * a partir de numeros
 * @param x 
 * @param y 
 * @returns Vector
 */
export function gridPos(x:number, y:number): Vector {
    return myp5.createVector(myp5.floor(x / ts), myp5.floor(y / ts));
}

export function insideCircle(x:number, y:number, cx:number, cy:number, r:number) {
    return myp5.sq(x - cx) + myp5.sq(y - cy) < myp5.sq(r);
}

export function mouseInMap() {
    return between(myp5.mouseX, 0, myp5.width) && between(myp5.mouseY, 0, myp5.height);
}

// Return orthogonal neighbors of a certain value
export function neighbors(grid:string[][], col:number, row:number, val:any) {
    var neighbors = [];
    if (col !== 0 && grid[col - 1][row] === val) {
        neighbors.push(cts(col - 1, row));
    }
    if (row !== 0 && grid[col][row - 1] === val) {
        neighbors.push(cts(col, row - 1));
    }
    if (col !== grid.length - 1 && grid[col + 1][row] === val) {
        neighbors.push(cts(col + 1, row));
    }
    if (row !== grid[col].length - 1 && grid[col][row + 1] === val) {
        neighbors.push(cts(col, row + 1));
    }
    return neighbors;
}

export function outsideRect(x:number, y:number, cx:number, cy:number, w:number, h:number) {
    return x < cx || y < cy || x > cx + w || y > cy + h;
}

export function polygon(x:number, y:number, radius:number, npoints:number) {
    var angle = myp5.TWO_PI / npoints;
    myp5.beginShape();
    for (var a = 0; a < myp5.TWO_PI; a += angle) {
        var sx = x + myp5.cos(a) * radius;
        var sy = y + myp5.sin(a) * radius;
        myp5.vertex(sx, sy);
    }
    myp5.endShape(myp5.CLOSE);
}

// Returns a random integer, using the same arguments as p5js random()
export function randint(...randomInt:number[]) {
    return myp5.floor(myp5.random(...randomInt));
}

// Displays a range of numbers
export function rangeText(min:number, max:number) {
    if (min === max) {
        return String(min);
    } else {
        return String(min) + '-' + String(max);
    }
}

// Remove empty temporary spawnpoints
export function removeTempSpawns() {
    for (var i = tempSpawns.length - 1; i >= 0; i--) {
        if (tempSpawns[i][1] === 0) tempSpawns.splice(i, 1);
    }
}

// Replace values in copy of 2d array
export function replaceArray(arr: Array<any>, vals:Array<any>, subs:Array<any>) {
    var newArr:number[][] = [];
    for (var x = 0; x < arr.length; x++) {
        newArr[x] = [];
        for (var y = 0; y < arr[x].length; y++) {
            var curVal = arr[x][y];
            var i = vals.indexOf(curVal);
            if (i === -1) {
                newArr[x][y] = curVal;
            } else {
                newArr[x][y] = vals.length === subs.length ? subs[i] : subs[0];
            }
        }
    }
    return newArr;
}

// Convert string to vectors
export function stv(str:string) {
    var arr = str.split(',');
    //p5
    return myp5.createVector(parseInt(arr[0]), parseInt(arr[1]));
}

// Convert vector to string
export function vts(v:p5.Vector) {
    return v.x + ',' + v.y;
}

