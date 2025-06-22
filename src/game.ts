import { Bomb, Square, Vanilla } from "./cell";
import { Grid } from "./grid";
import { shuffle } from "./random";

type Result = "Win" | "Lose" | "Playing"

export class Game {

    grid: Grid
    private bombs: number

    private result: Result

    constructor(grid: Grid, bombs: number) {
        this.grid = grid
        this.bombs = bombs
    }

    get isSettled(): boolean {
        return this.result != "Playing"
    }

    get isCleared(): boolean {
        return this.result == "Win"
    }

    resume(grid: Grid): this {
        this.grid = grid
        this.result = "Playing"
        return this
    }

    reset(seed: number): this {

        const cells: number[] = [...new Array(this.grid.area)].map((_, i) => i)
        const shuffled = shuffle(cells, seed)

        const bombs: Square[] = [...shuffled.slice(0, this.bombs)].map(n => new Bomb(n, () => { this.result = "Lose" }))
        const vanillas: Square[] = [...shuffled.slice(this.bombs, shuffled.length)].map(n => new Vanilla(n, this.grid.neighbors.bind(this.grid)))

        this.grid.fill(bombs.concat(vanillas))

        this.result = "Playing"

        return this
    }

    open(x: number, y: number): this {
        this.grid.open(x, y)

        // console.log(`${this.result} ${this.grid.sealed} ${this.bombs}`)

        if (this.result == "Playing" && this.grid.sealed == this.bombs) {
            this.result = "Win"
        }

        return this
    }

    print(): string {
        return this.grid.string()
    }

}