import { Game } from "./game";
import { Grid } from "./grid";

type Range = GoogleAppsScript.Spreadsheet.Range

global.reset = reset;
function reset(seed: number, x: number, y: number, bombs: number): Game {
    return new Game(new Grid(x, y), bombs).reset(seed)
}

global.resume = resume;
function resume(seed: number, x: number, y: number, opened: [number, number][], bombs: number): Game {

    const game: Game = new Game(new Grid(x, y), bombs).reset(seed)

    opened.forEach(([x, y]) => {
        game.open(x, y)
    })

    return game
}

global.getGrid = getGrid;
function getGrid(): SpreadsheetCell[] {

    const app = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = app.getSheetByName("シート1")

    const cells: SpreadsheetCell[] = new Array<SpreadsheetCell>()
    for (let row = 0; row < 16; row++) {

        for (let col = 0; col < 16; col++) {
            cells.push(new SpreadsheetCell(col, row, sheet.getRange(12 + (row * 2), 4 + (col * 2))))
        }
    }

    return cells
}

type Header = {
    count: Range;
    face: Range;
    time: Range;
}

function getHeader(): Header {

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1")

    return {
        count: sheet.getRange(6, 4),
        face: sheet.getRange(6, 10),
        time: sheet.getRange(6, 30)
    }
}

type MetaData = {
    startAt: Range;
    seed: Range;
}

function getMetaData(): MetaData {

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1")

    return {
        startAt: sheet.getRange(48, 1),
        seed: sheet.getRange(48, 2),
    }
}



class SpreadsheetCell {

    x: number
    y: number
    range: Range

    constructor(x: number, y: number, range: Range) {

        this.x = x
        this.y = y
        this.range = range

    }

    get opened(): boolean {
        return !this.range.isBlank()
    }

    open(v: string): void {

        this.range.setBackground("#EFEFEF")

        switch (v) {
            case "0":
                return
            case "1":
                this.range.setFontColor("#0000FF")
                break
            case "2":
                this.range.setFontColor("#f1c232")
                break
            case "3":
                this.range.setFontColor("#CC0000")
                break
            case "4":
                this.range.setFontColor("#c27ba0")
                break
        }

        this.range.setValue(v == "B" ? "🎁" : v)
    }

    hide(): void {
        this.range.setBackground("#b7b7b7")
        this.range.setValue("")
    }

}

global.init = init;
function init(): void {

    // const game = reset(772549, 9, 9, 10)
    const cells = getGrid()
    cells.forEach(c => c.hide())

    const header = getHeader()
    header.face.setValue("😀")
    header.count.setValue(0)
    header.time.setValue("?:??")

    const metaData = getMetaData()
    metaData.startAt.setValue(new Date().getTime())

}

global.onOpen = onOpen;
function onOpen(event: OnSelectionChangeEvent): void {

    const cells = getGrid()
    const select = cells.find(c => c.range.getA1Notation() == event.range.getA1Notation())

    if (!select || select.opened) return

    const header = getHeader()
    header.face.setValue("😨")

    const opened: [number, number][] = cells.filter(c => c.opened).map(c => [c.x, c.y])
    const seed: number = getMetaData().seed.getValue()
    const game = resume(seed, 16, 16, opened, 30)
    game.open(select.x, select.y)

    game.grid.walk(s => {

        if (!s.opened) return

        cells[s.index].open(s.string())

    })

    header.count.setValue(header.count.getValue() + 1)

    if (game.isSettled) {

        header.face.setValue(game.isCleared ? "🥳" : "🎅")
        if (!game.isCleared) {
            lose(game)
        }

        const { startAt } = getMetaData()

        const seconds: number = Math.trunc((new Date().getTime() - startAt.getValue()) / 1000)
        header.time.setValue(`${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')} `)

    } else {
        header.face.setValue("😀")
    }

}

global.onSelectionChange = onSelectionChange;
function onSelectionChange(e: OnSelectionChangeEvent): void {

    console.log(e.range.getA1Notation())

    if (e.source.getActiveSheet().getName() != "シート1") return

    if (e.range.getA1Notation() == "J6:AB8") {
        init()
        return
    }

    onOpen(e)
}

type OnSelectionChangeEvent = {
    range: GoogleAppsScript.Spreadsheet.Range
    source: GoogleAppsScript.Spreadsheet.SpreadsheetApp
}

const yelllow1 = "#f1c232"
// const red1 = "#cc0000"
const green1 = "#6aa84f"
const green2 = "#38761d"
const green3 = "#274e13"
// const brown1 = "#7f6000"
const brown2 = "#b45f06"
const bg1 = "#d0e0e3"
// const bg2 = "#f3f3f3"
// const blue1 = "#cfe2f3"

function lose(game: Game): void {

    const vs: [string, string][] = [
        ["", bg1], ["", bg1], ["", bg1], ["", bg1], ["⭐️", yelllow1], ["", bg1], ["", bg1], ["", bg1], ["", bg1],
        ["", bg1], ["", bg1], ["", bg1], ["", green1], ["", green2], ["", green2], ["", bg1], ["", bg1], ["", bg1],
        ["", bg1], ["", bg1], ["", bg1], ["", green2], ["", green2], ["", green1], ["", bg1], ["", bg1], ["", bg1],
        ["", bg1], ["", bg1], ["", green2], ["", green2], ["", green2], ["", green1], ["", green1], ["", bg1], ["", bg1],
        ["", bg1], ["", bg1], ["", green1], ["", green1], ["", green2], ["", green2], ["", green1], ["", bg1], ["", bg1],
        ["", bg1], ["", green1], ["", green2], ["", green1], ["", green1], ["", green2], ["", green1], ["", green2], ["", bg1],
        ["", bg1], ["", green2], ["", green1], ["", green2], ["", green2], ["", green1], ["", green2], ["", green2], ["", bg1],
        ["", green3], ["", green2], ["", green2], ["", green3], ["", green3], ["", green2], ["", green3], ["", green3], ["", green3],
        ["", bg1], ["", bg1], ["", bg1], ["", brown2], ["", brown2], ["", brown2], ["", bg1], ["", bg1], ["", bg1],
    ]

    const grid = getGrid()

    for (const i in vs) {

        const [v, color] = vs[i]

        const cell = game.grid.cells[i]
        grid[i].open(v ? v : cell.string())

        grid[i].range.setBackground(color)

    }

}