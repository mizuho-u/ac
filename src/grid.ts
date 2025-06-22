import { Square } from "./cell"


export class Grid {
    cells: Square[]

    private width
    private height

    constructor(w: number, h: number) {
        this.width = w
        this.height = h
    }

    get area(): number {
        return this.width * this.height
    }

    get opened(): number {
        return this.cells.filter(c => c.opened).length
    }

    get sealed(): number {
        return this.area - this.opened
    }

    fill(cells: Square[]): void {
        this.cells = cells.sort((a, b) => a.index - b.index)
    }

    open(x: number, y: number): void {
        this.cells[this.index(x, y)].open()
    }

    neighbors(index: number): Square[] {

        const [x, y] = this.xy(index)

        return [
            this.cells[this.index(x, y - 1)], // up
            this.cells[this.index(x, y + 1)], // down
            this.cells[this.index(x - 1, y)], // left
            this.cells[this.index(x + 1, y)], // right
            this.cells[this.index(x - 1, y - 1)], // upper left
            this.cells[this.index(x + 1, y - 1)], // upper right
            this.cells[this.index(x - 1, y + 1)], // lower left
            this.cells[this.index(x + 1, y + 1)], // lower right
        ].filter(c => !!c)

    }

    walk(f: (s: Square) => void) {
        for (const s of this.cells) {
            f(s)
        }
    }

    string(): string {

        let str: string = "";

        [...new Array(this.height)].forEach((_, y) => {

            [...new Array(this.width)].forEach((_, x) => {
                const cell = this.cells[this.index(x, y)]
                str += cell.opened ? "X" : cell.string()
            })

            str += "\n"
        })

        return str.substring(0, str.length - 1)
    }

    private index(x: number, y: number): number {
        if ((x < 0 || y < 0) || (x > this.width - 1 || y > this.height - 1)) return -1

        return x + (y * this.width)
    }

    private xy(index: number): [x: number, y: number] {
        return [index % this.width, Math.trunc(index / this.height)]
    }

}


