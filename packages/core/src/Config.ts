export const defaultConfig = {
    bpm: 128,  // a value of beat per minute
    double: 0, // double bpm bvalue
    halve: 0,  // halve bpm value
    grid: 0,   // the nearest Beatgrid point
    loop: 0,   // auto beat loop
    jump: 0,   // ?
    rate: 1,   // ?
    range: 1,  // the tempo range
    speed: 1,  // playing speed display
    pitch: 1,  // the pitch value
    SLIP: false,
    Q: false,
    language: 'en',
    title: 'Anonymous'
}

export class Config {
    bpm!: number
    grid!: number
    loop!: number
    jump!: number
    rate!: number
    range!: number
    speed!: number
    pitch!: number
    SLIP!: boolean
    Q!: boolean
    language!: string

    constructor() {
        Object.assign(this, defaultConfig)
    }
}
