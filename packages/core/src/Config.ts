export const defaultConfig = {
    bpm: 128,  // a value of beat per minute
    double: 0, // double bpm bvalue
    halve: 0,  // halve bpm value
    grid: 0,   // the nearest Beatgrid point
    loop: 0,   // auto beat loop
    jump: 0,   // ?
    step: 0,   // ? Sequencer
    steps: 0,  // ? Sequencer
    octave: 4, // ? Sequencer
    rate: 1,   // ?
    release: 4,// ? Sequencer
    range: 1,  // the tempo range
    speed: 1,  // playing speed display
    pitch: 1,  // the pitch value
    playing: false, // ? Sequencer
    delay: false,   // ? Sequencer
    SLIP: false,
    Q: false,
    language: 'en',     // todo: AudioSpeechAPI
    title: 'Anonymous', // ?
    type: 'sine',       // ?
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

    constructor(config: Partial<Config> = {}) {
        Object.assign(this, defaultConfig, config)
    }

    set (config: Partial<Config> = {}) {
        return Object.assign(this, config)
    }
}
