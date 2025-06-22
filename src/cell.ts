export abstract class Square {

    index: number
    opened: boolean

    constructor(index: number) {
        this.index = index
    }

    open(): void {
        if (this.opened) return
        this.opened = true
        this._open()
    }

    protected abstract _open(): void
    abstract string(): string

}

export class Vanilla extends Square {

    neighbors: (index: number) => Square[]

    constructor(index: number, neighbors: (index: number) => Square[]) {
        super(index)
        this.neighbors = neighbors
    }

    _open(): void {
        if (this.neighborBombs().length > 0) return

        this.neighbors(this.index).filter(c => c instanceof Vanilla).forEach(c => c.open())
    }

    private neighborBombs(): Square[] {
        return this.neighbors(this.index).filter(c => c instanceof Bomb)
    }

    string(): string {
        return this.neighborBombs().length.toString()
    }
}

export class Bomb extends Square {

    onOpened: () => void

    constructor(index: number, onOpened: () => void) {
        super(index)
        this.onOpened = onOpened
    }

    _open(): void {
        this.onOpened()
    }

    string(): string {
        return "B"
    }
}