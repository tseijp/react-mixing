import {Lookup} from './types'
import {
    frameLoop,
} from './utils'

let nextId = 1
export class SynthValue <T extends Lookup = Lookup> {
    readonly id = nextId++
}
