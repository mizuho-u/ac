import { xor4096 } from 'seedrandom'

export const shuffle = <T>(arr: T[], seed: number): T[] => {

    if (!arr) return arr

    const shuffled = [...arr]
    let m: number = shuffled.length

    while (m) {

        const i = Math.floor(random(seed.toString()) * m--)

        const a = shuffled[m]
        const b = shuffled[i]

        shuffled[m] = b
        shuffled[i] = a

        ++seed
    }

    return shuffled
}

const random = (seed: string): number => {
    const rand = xor4096(seed)
    return rand.double()
}
