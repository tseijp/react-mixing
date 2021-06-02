import {SynthConfig} from './SynthConfig'

export class Synth <T = any> {
    changed = false
    values: readonly any[] = []
    toValues: readonly number[] = []
    fromValues: readonly number[] = []

    to!: T
    from!: T

    config = new SynthConfig()
    immediate = false
}
