export const defaultConfig = {
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: 1,
    lang: 'en'
}

export class Config {
    rate!: number
    pitch!: number
    volume!: number
    voice!: number
    lang!: string
    constructor() {
        Object.assign(this, defaultConfig)
    }
}
