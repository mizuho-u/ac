import { shuffle } from "./random";

test("shuffle", () => {

    const arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    expect(shuffle(arr, 1)).toStrictEqual(["F", "C", "I", "B", "D", "G", "A", "H", "J", "E"])
    expect(shuffle(arr, 17)).toStrictEqual(["C", "J", "A", "H", "B", "E", "D", "F", "G", "I"])
    expect(shuffle(arr, 37)).toStrictEqual(["B", "F", "G", "D", "C", "J", "E", "A", "I", "H"])

});