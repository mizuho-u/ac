import { Bomb, Square, Vanilla } from "./cell";
import { Grid } from "./grid";

test("隣接するセルを取得する", () => {

    const grid = new Grid(9, 9)
    grid.fill([...new Array(81)].map((_, i) => new Vanilla(i, grid.neighbors)))

    // | 0| 1| 2| 3| 4| 5| 6| 7| 8|
    // | 9|10|11|12|13|14|15|16|17|
    // |18|19|20|21|22|23|24|25|26|
    // |27|28|29|30|31|32|33|34|35|
    // |36|37|38|39|40|41|42|43|44|
    // |45|46|47|48|49|50|51|52|53|
    // |54|55|56|57|58|59|60|61|62|
    // |63|64|65|66|67|68|69|70|71|
    // |72|73|74|75|76|77|78|79|80|
    expect(grid.neighbors(0).length).toBe(3)
    expect(grid.neighbors(1).length).toBe(5)
    expect(grid.neighbors(8).length).toBe(3)
    expect(grid.neighbors(80).length).toBe(3)
    expect(grid.neighbors(19).length).toBe(8)
    expect(grid.neighbors(-3).length).toBe(0)
    expect(grid.neighbors(82).length).toBe(3)
});

test("fill grid with cells", () => {

    const grid = new Grid(9, 9)
    grid.fill([...new Array(81)].map((_, i) => new Vanilla(i, grid.neighbors.bind(grid))))

    expect(grid.string()).toBe(`
000000000
000000000
000000000
000000000
000000000
000000000
000000000
000000000
000000000`.slice(1))

    const grid2 = new Grid(9, 9)
    const cells: Square[] = [...new Array(81)].map((_, i) => new Vanilla(i, grid2.neighbors.bind(grid2)))
    cells[40] = new Bomb(40, () => { })
    grid2.fill(cells)

    expect(grid2.string()).toBe(`
000000000
000000000
000000000
000111000
0001B1000
000111000
000000000
000000000
000000000`.slice(1))

    const grid3 = new Grid(9, 9)
    const cells3: Square[] = [...new Array(81)].map((_, i) => new Vanilla(i, grid3.neighbors.bind(grid3)))
    cells3[39] = new Bomb(39, () => { })
    cells3[40] = new Bomb(40, () => { })
    cells3[41] = new Bomb(41, () => { })

    grid3.fill(cells3)

    expect(grid3.string()).toBe(`
000000000
000000000
000000000
001232100
001BBB100
001232100
000000000
000000000
000000000`.slice(1))

});


test("open cell", () => {

    const grid = new Grid(9, 9)
    const cells: Square[] = [...new Array(81)].map((_, i) => new Vanilla(i, grid.neighbors.bind(grid)))

    grid.fill(cells)
    expect(grid.string()).toBe(`
000000000
000000000
000000000
000000000
000000000
000000000
000000000
000000000
000000000`.slice(1))

    grid.open(0, 0)
    expect(grid.string()).toBe(`
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX`.slice(1))

    const cells2: Square[] = [...new Array(81)].map((_, i) => new Bomb(i, () => { }))

    for (const i of range(20, 25)) {
        cells2[i] = new Vanilla(i, grid.neighbors.bind(grid))
    }

    for (const i of range(29, 34)) {
        cells2[i] = new Vanilla(i, grid.neighbors.bind(grid))
    }

    for (const i of range(38, 43)) {
        cells2[i] = new Vanilla(i, grid.neighbors.bind(grid))
    }

    for (const i of range(47, 52)) {
        cells2[i] = new Vanilla(i, grid.neighbors.bind(grid))
    }

    for (const i of range(56, 61)) {
        cells2[i] = new Vanilla(i, grid.neighbors.bind(grid))
    }

    grid.fill(cells2)
    expect(grid.string()).toBe(`
BBBBBBBBB
BBBBBBBBB
BB53335BB
BB30003BB
BB30003BB
BB30003BB
BB53335BB
BBBBBBBBB
BBBBBBBBB`.slice(1))

    grid.open(5, 5)
    expect(grid.string()).toBe(`
BBBBBBBBB
BBBBBBBBB
BBXXXXXBB
BBXXXXXBB
BBXXXXXBB
BBXXXXXBB
BBXXXXXBB
BBBBBBBBB
BBBBBBBBB`.slice(1))

});

function* range(start: number, end: number) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}