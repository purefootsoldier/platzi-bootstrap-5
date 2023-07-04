export abstract class BaseMaps implements IMaps{
    display: string[][];
    displayDir: number[][] ;
    grid: number[][];
    metadata: (number | null)[][];
    paths: number[][];
    exit: number[];
    spawnpoints: number[][];
    bg: number[];
    border: number;
    borderAlpha: number;
    cols: number;
    rows: number;

    constructor () {
        this.display = this.getDisplay();
        this.displayDir = this.getDisplayDir();
        this.grid = this.getGrid();
        this.metadata = this.getMetadata();
        this.paths = this.getPaths();
        this.exit = this.getExit();
        this.spawnpoints = this.getSpawnPoints();
        this.bg = this.getBg();
        this.border = this.getBorder();
        this.borderAlpha = this.getBorderAlpha();
        this.cols = this.getCols();
        this.rows = this.getRows();
        
    }
    abstract getDisplay():string[][];
    abstract getDisplayDir():number[][];
    abstract getGrid():number[][];
    abstract getMetadata():(number | null)[][];
    abstract getPaths(): number[][];
    abstract getExit():number[];
    abstract getSpawnPoints():number[][];
    abstract getBg(): number[];
    abstract getBorder(): number;
    abstract getBorderAlpha(): number;
    abstract getCols(): number;
    abstract getRows(): number;

}