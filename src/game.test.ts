import { Game } from "./game";
import { Grid } from "./grid";

test("game lose", () => {

    const game: Game = new Game(new Grid(9, 9), 10).reset(123456)

    expect(game.print()).toBe(`
1B101B100
111011100
000111000
0002B3100
0002BB200
00013B200
122111100
1BB321000
123BB1000`.slice(1))

    expect(game.open(3, 0).isSettled).toBe(false)

    expect(game.open(1, 0).isSettled).toBe(true)
    expect(game.isCleared).toBe(false)

});

test("game win", () => {

    const game: Game = new Game(new Grid(9, 9), 10).reset(123456)

    expect(game.print()).toBe(`
1B101B100
111011100
000111000
0002B3100
0002BB200
00013B200
122111100
1BB321000
123BB1000`.slice(1))

    game.open(0, 0)
        .open(3, 0)
        .open(8, 0)
        .open(4, 5)
        .open(4, 6)
        .open(0, 7)
        .open(3, 7)
        .open(4, 7)
        .open(0, 8)
        .open(1, 8)

    expect(game.isSettled).toBe(false)

    game.open(2, 8)
    expect(game.isSettled).toBe(true)
    expect(game.isCleared).toBe(true)

});

test("game", () => {

    // 1357913 772549 
    // const game: Game = new Game(new Grid(9, 9), 10).reset(1357913)

    // for (let i = 500000; i < 1000000; i++) {

    //     const game: Game = new Game(new Grid(9, 9), 10).reset(i)
    //     let cs = game.grid.cells.slice(0, 9)
    //     if (cs.filter(c => c.string() == "B").length != 1 || cs.at(4).string() != "B") {
    //         continue
    //     }

    //     cs = game.grid.cells.slice(9, 18)
    //     if (cs.slice(0, 3).filter(c => c.string() == "B").length != 0 || cs.slice(6, 9).filter(c => c.string() == "B").length != 0) {
    //         continue
    //     }

    //     cs = game.grid.cells.slice(18, 27)
    //     if (cs.slice(0, 3).filter(c => c.string() == "B").length != 0 || cs.slice(6, 9).filter(c => c.string() == "B").length != 0) {
    //         continue
    //     }

    //     cs = game.grid.cells.slice(27, 36)
    //     if (cs.slice(0, 2).filter(c => c.string() == "B").length != 0 || cs.slice(7, 9).filter(c => c.string() == "B").length != 0) {
    //         continue
    //     }

    //     cs = game.grid.cells.slice(36, 45)
    //     if (cs.slice(0, 2).filter(c => c.string() == "B").length != 0 || cs.slice(7, 9).filter(c => c.string() == "B").length != 0) {
    //         continue
    //     }

    //     cs = game.grid.cells.slice(45, 54)
    //     if (cs.slice(0, 1).filter(c => c.string() == "B").length != 0 || cs.slice(8, 9).filter(c => c.string() == "B").length != 0) {
    //         continue
    //     }

    //     cs = game.grid.cells.slice(54, 63)
    //     if (cs.slice(0, 1).filter(c => c.string() == "B").length != 0 || cs.slice(8, 9).filter(c => c.string() == "B").length != 0) {
    //         continue
    //     }

    //     cs = game.grid.cells.slice(63, 81)
    //     if (cs.filter(c => c.string() == "B").length != 0) {
    //         continue
    //     }

    //     console.log(i)
    //     console.log(game.print())

    // }

    // expect("aaa").toBe(``)

})